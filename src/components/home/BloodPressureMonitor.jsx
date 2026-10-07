import React, { useEffect, useRef } from 'react';

export default function BloodPressureMonitor() {
  const containerRef = useRef(null);

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;

    const $ = (id) => root.querySelector(`#${id}`);

    const SEG = {
      a: [6, 2, 28, 6],
      b: [32, 5, 6, 28],
      c: [32, 39, 6, 28],
      d: [6, 66, 28, 6],
      e: [2, 39, 6, 28],
      f: [2, 5, 6, 28],
      g: [6, 34, 28, 6]
    };
    const MAP = {
      '0': 'abcdef',
      '1': 'bc',
      '2': 'abdeg',
      '3': 'abcdg',
      '4': 'bcfg',
      '5': 'acdfg',
      '6': 'acdefg',
      '7': 'abc',
      '8': 'abcdefg',
      '9': 'abcdfg',
      '-': 'g',
      'o': 'cdeg',
      'n': 'ceg',
      'F': 'aefg',
      'C': 'adef',
      'L': 'def',
      'r': 'eg'
    };

    function show(id, v, n = 3) {
      const el = $(id);
      if (!el) return;
      const count = Math.max(3, Number(n) || 3);
      let s = String(v ?? '');
      while (s.length < count) s = ' ' + s;
      let h = `<svg viewBox="0 0 ${count * 50 + 10} 74" class="h-full w-auto block" preserveAspectRatio="xMidYMid meet">`;
      for (let i = 0; i < count; i++) {
        h += `<g transform="translate(${i * 50 + 10},0) skewX(-6)">`;
        const char = s[i];
        const segs = MAP[char] || '';
        for (const k in SEG) {
          const r = SEG[k];
          const active = segs.indexOf(k) >= 0;
          h += `<rect class="${active ? 'bpm-sg1' : 'bpm-sg0'}" x="${r[0]}" y="${r[1]}" width="${r[2]}" height="${r[3]}" rx="1.5"/>`;
        }
        h += '</g>';
      }
      el.innerHTML = h + '</svg>';
    }

    const CLS = ['OPTIMAL', 'NORMAL', 'HIGH-NORMAL', 'HIGH GRADE 1', 'HIGH GRADE 2+'];
    function cls(s, d) {
      return s >= 160 || d >= 100 ? 4 : s >= 140 || d >= 90 ? 3 : s >= 130 || d >= 85 ? 2 : s >= 120 || d >= 80 ? 1 : 0;
    }

    const SETF = ['YEAR', 'MONTH', 'DAY', 'HOUR', 'MINUTE', 'USER', 'BEEP'];
    let RES = { sys: 118, dia: 78, pul: 72 };
    let TGT;
    let period = 60 / 72;
    const speed = 110;
    const mem = { 1: [], 2: [] };
    let on = true;
    let ph = 'idle';
    let mode = 'ready';
    let setIdx = 0;
    let mi = -1;
    let user = 1;
    let sound = true;
    let count = 0;
    let off = 0;
    let lastAct = Date.now();
    let t0 = 0;
    let cuff = 0;
    let amp = 1;
    let peak = 0;
    let low = 0;
    let c0 = 0;
    let aborted = false;
    let lastBi = -1;
    let lastV = -1;
    let over = null;
    let tmr = null;
    let ac = null;
    let lp = null;
    let animId = null;
    let clockInterval = null;

    const cv = $('bpm-wave');
    if (!cv) return;
    const ctx = cv.getContext('2d');
    let W = 240;
    let H = 48;
    const st = $('bpm-st');
    const mEl = $('bpm-m');
    const hrt = $('bpm-hrt');

    function now() {
      return new Date(Date.now() + off);
    }
    function pad(n) {
      return n < 10 ? '0' + n : '' + n;
    }
    function stamp(d) {
      return pad(d.getMonth() + 1) + '-' + pad(d.getDate()) + ' ' + pad(d.getHours()) + ':' + pad(d.getMinutes());
    }
    function clkTxt() {
      const d = now();
      return (mode === 'set' ? d.getFullYear() + '-' : '') + stamp(d);
    }
    function rnd(n) {
      return Math.round((Math.random() * 2 - 1) * n);
    }

    function beep(f, d) {
      if (!sound) return;
      try {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (!AudioContextClass) return;
        ac = ac || new AudioContextClass();
        if (ac.state === 'suspended') {
          ac.resume();
        }
        const o = ac.createOscillator();
        const gNode = ac.createGain();
        o.frequency.value = f;
        gNode.gain.value = 0.06;
        o.connect(gNode);
        gNode.connect(ac.destination);
        o.start();
        o.stop(ac.currentTime + d);
      } catch (e) { }
    }

    function hb() {
      if (!hrt) return;
      hrt.classList.remove('hb');
      void hrt.offsetWidth;
      hrt.classList.add('hb');
    }

    function render(msg) {
      const head = $('bpm-head');
      if (head) head.style.visibility = on ? 'visible' : 'hidden';

      if (!on) {
        show('bpm-sys', '', 3);
        show('bpm-dia', '', 3);
        show('bpm-pul', '', 3);
        if (st) st.textContent = 'STANDBY - PRESS ANY BUTTON';
        return;
      }

      let s = '';
      let d = '';
      let p = '';
      let n = 3;
      let t = msg || '';
      let bar = -1;
      let mT = 'M';
      const L = mem[user];

      if (ph === 'test') {
        s = d = p = '888';
        bar = 4;
        t = 'SELF TEST';
      } else if (ph !== 'idle') {
        s = ph === 'zero' ? 0 : Math.round(cuff);
        t = {
          zero: 'ZEROING...',
          inflate: 'INFLATING (MWI)...',
          deflate: 'MEASURING - DO NOT MOVE',
          release: 'RELEASING PRESSURE'
        }[ph] || '';
      } else if (over) {
        s = over.s;
        d = over.d;
        p = over.p;
        t = over.t;
      } else if (mode === 'set') {
        const dt = now();
        const f = SETF[setIdx];
        s = f === 'YEAR' ? dt.getFullYear() : f === 'MONTH' ? dt.getMonth() + 1 : f === 'DAY' ? dt.getDate() : f === 'HOUR' ? dt.getHours() : f === 'MINUTE' ? dt.getMinutes() : f === 'USER' ? user : (sound ? ' on' : 'oFF');
        n = f === 'YEAR' ? 4 : 3;
        t = 'SET ' + f + ' | MEM:+  SET:NEXT  START:EXIT';
      } else if (mode === 'mem') {
        if (mi < 0) {
          const k = Math.min(3, L.length);
          let a = 0, b = 0, c = 0;
          for (let i = 0; i < k; i++) {
            a += L[i].s;
            b += L[i].d;
            c += L[i].p;
          }
          s = Math.round(a / k);
          d = Math.round(b / k);
          p = Math.round(c / k);
          mT = 'AVG';
          t = 'AVERAGE OF LAST ' + k + '  MEM:NEXT';
        } else {
          const r = L[mi];
          s = r.s;
          d = r.d;
          p = r.p;
          t = 'M' + (mi + 1) + '/' + L.length + ' ' + r.t + '  HOLD MEM:CLEAR';
        }
        bar = cls(s, d);
      } else {
        s = RES.sys;
        d = RES.dia;
        p = RES.pul;
        bar = cls(s, d);
        t = t || 'READY - PRESS START';
      }

      show('bpm-sys', s, n);
      show('bpm-dia', d, 3);
      show('bpm-pul', p, 3);

      const usrEl = $('bpm-usr');
      if (usrEl) usrEl.textContent = 'U' + user;

      const sndEl = $('bpm-snd');
      if (sndEl) sndEl.className = sound ? 'bpm-snd' : 'bpm-snd off';

      const clkEl = $('bpm-clk');
      if (clkEl) clkEl.textContent = clkTxt();

      const barsContainer = $('bpm-bars');
      if (barsContainer) {
        const bs = barsContainer.children;
        for (let j = 0; j < 5; j++) {
          if (bs[j]) bs[j].className = j <= bar ? 'l' : '';
        }
      }

      if (mEl) {
        mEl.className = 'bpm-m' + ((ph === 'test' || (mode === 'mem' && ph === 'idle' && !over)) ? ' on' : '');
        mEl.textContent = mT;
      }

      if (hrt) {
        hrt.className = 'bpm-heart' + (ph === 'idle' ? ' idle' : '');
        hrt.style.setProperty('--bp', period + 's');
      }

      const sysEl = $('bpm-sys');
      if (sysEl) {
        sysEl.className = (mode === 'set' && ph === 'idle' && !over) ? 'bpm-fl' : '';
      }

      if (st) st.textContent = t;
    }

    function flash(o) {
      over = o;
      render();
      clearTimeout(tmr);
      tmr = setTimeout(() => {
        over = null;
        render();
      }, 1600);
    }

    function resize() {
      if (!cv) return;
      const r = cv.getBoundingClientRect();
      const d = window.devicePixelRatio || 1;
      W = r.width || 240;
      H = r.height || 48;
      cv.width = W * d;
      cv.height = H * d;
      ctx.setTransform(d, 0, 0, d, 0, 0);
    }

    window.addEventListener('resize', resize);
    resize();

    function gVal(p, c, s) {
      const x = (p - c) / s;
      return Math.exp(-x * x);
    }
    function beat(p) {
      return gVal(p, 0.12, 0.05) + 0.35 * gVal(p, 0.38, 0.08);
    }

    function draw(time) {
      ctx.clearRect(0, 0, W, H);
      if (!on) return;
      // Grid lines in subtle violet glow
      ctx.strokeStyle = 'rgba(139, 92, 246, 0.15)';
      ctx.lineWidth = 1;
      for (let i = 0; i < W; i += 12) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, H);
        ctx.stroke();
      }
      for (let j = 0; j < H; j += 12) {
        ctx.beginPath();
        ctx.moveTo(0, j);
        ctx.lineTo(W, j);
        ctx.stroke();
      }
      // Glowing emerald ECG waveform
      ctx.beginPath();
      for (let x = 0; x <= W; x += 2) {
        const p = ((((time - (W - x) / speed) / period) % 1) + 1) % 1;
        const y = H * 0.88 - beat(p) * amp * H * 0.76;
        x ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      }
      ctx.strokeStyle = '#34d399';
      ctx.lineWidth = 1.75;
      ctx.lineJoin = 'round';
      ctx.stroke();
    }

    function go2(p) {
      ph = p;
      t0 = performance.now() / 1000;
      lastV = -1;
      render();
    }

    function startMeas() {
      mode = 'ready';
      over = null;
      aborted = false;
      TGT = count === 0 ? { sys: 118, dia: 78, pul: 72 } : { sys: 118 + rnd(5), dia: 78 + rnd(4), pul: 72 + rnd(4) };
      period = 60 / TGT.pul;
      cuff = 0;
      lastBi = -1;
      beep(1000, 0.12);
      go2('test');
    }

    function abort() {
      if (ph === 'release') return;
      beep(500, 0.2);
      if (ph === 'test' || ph === 'zero') {
        ph = 'idle';
        cuff = 0;
        amp = 1;
        period = 60 / RES.pul;
        render('STOPPED');
        return;
      }
      aborted = true;
      c0 = cuff;
      go2('release');
    }

    function done() {
      if (aborted) {
        aborted = false;
        ph = 'idle';
        amp = 1;
        period = 60 / RES.pul;
        beep(500, 0.3);
        render('STOPPED - NO READING');
        return;
      }
      RES = TGT;
      count++;
      period = 60 / RES.pul;
      ph = 'idle';
      amp = 1;
      mode = 'ready';
      mem[user].unshift({ s: RES.sys, d: RES.dia, p: RES.pul, t: stamp(now()) });
      if (mem[user].length > 60) mem[user].pop();
      beep(1300, 0.15);
      setTimeout(() => {
        beep(1300, 0.35);
      }, 220);
      render('SAVED - ' + CLS[cls(RES.sys, RES.dia)]);
    }

    function loop(ms) {
      const time = ms / 1000;
      if (on && ph !== 'idle') {
        const e = time - t0;
        if (ph === 'test') {
          amp = 0;
          if (e >= 1) go2('zero');
        } else if (ph === 'zero') {
          amp = 0;
          if (e >= 0.8) {
            peak = TGT.sys + 30;
            low = TGT.dia - 14;
            go2('inflate');
          }
        } else if (ph === 'inflate') {
          cuff = peak * Math.min(e / 5, 1);
          amp = 0.08;
          if (e >= 5) go2('deflate');
        } else if (ph === 'deflate') {
          cuff = peak - (peak - low) * Math.min(e / 9, 1);
          const mapVal = TGT.dia + (TGT.sys - TGT.dia) / 3;
          const sg = (TGT.sys - TGT.dia) / 2.4;
          amp = 0.1 + 0.9 * Math.exp(-Math.pow((cuff - mapVal) / sg, 2));
          const bi = Math.floor(time / period);
          if (bi !== lastBi) {
            lastBi = bi;
            if (cuff < TGT.sys + 8 && cuff > TGT.dia - 12) {
              hb();
              beep(1800, 0.03);
            }
          }
          if (e >= 9) {
            c0 = low;
            go2('release');
          }
        } else if (ph === 'release') {
          cuff = c0 * (1 - Math.min(e / 0.9, 1));
          amp = 0.08;
          if (e >= 0.9) done();
        }
        if (ph !== 'idle' && ph !== 'test') {
          const v = ph === 'zero' ? 0 : Math.round(cuff);
          if (v !== lastV) {
            lastV = v;
            show('bpm-sys', v, 3);
          }
        }
      }
      draw(time);
      animId = requestAnimationFrame(loop);
    }

    function touch() {
      lastAct = Date.now();
    }
    function wake() {
      if (!on) {
        on = true;
        mode = 'ready';
        ph = 'idle';
        amp = 1;
        over = null;
      }
    }
    function bump() {
      const d = now();
      let Y = d.getFullYear();
      let M = d.getMonth();
      let D = d.getDate();
      let h = d.getHours();
      let m = d.getMinutes();
      const f = SETF[setIdx];
      if (f === 'YEAR') Y = Y >= 2099 ? 2024 : Y + 1;
      else if (f === 'MONTH') M = (M + 1) % 12;
      else if (f === 'DAY') {
        const dm = new Date(Y, M + 1, 0).getDate();
        D = D >= dm ? 1 : D + 1;
      } else if (f === 'HOUR') h = (h + 1) % 24;
      else if (f === 'MINUTE') m = (m + 1) % 60;
      else if (f === 'USER') user = 3 - user;
      else sound = !sound;

      D = Math.min(D, new Date(Y, M + 1, 0).getDate());
      off = new Date(Y, M, D, h, m, d.getSeconds()).getTime() - Date.now();
    }

    const goBtn = $('bpm-go');
    if (goBtn) {
      goBtn.onclick = () => {
        touch();
        wake();
        if (ph !== 'idle') return abort();
        if (mode !== 'ready') {
          mode = 'ready';
          over = null;
          beep(700, 0.06);
          return render('READY - PRESS START');
        }
        startMeas();
      };
    }

    let lpFired = false;
    const memBtn = $('bpm-mem');
    if (memBtn) {
      const handlePointerDown = () => {
        lpFired = false;
        clearTimeout(lp);
        lp = setTimeout(() => {
          if (on && ph === 'idle' && mode === 'mem') {
            lpFired = true;
            mem[user] = [];
            mode = 'ready';
            mi = -1;
            beep(600, 0.4);
            flash({ s: 'CLr', d: '', p: '', t: 'MEMORY CLEARED' });
          }
        }, 1800);
      };
      const handlePointerClear = () => {
        clearTimeout(lp);
      };

      memBtn.addEventListener('pointerdown', handlePointerDown);
      ['pointerup', 'pointerleave', 'pointercancel'].forEach((ev) => {
        memBtn.addEventListener(ev, handlePointerClear);
      });

      memBtn.addEventListener('click', () => {
        touch();
        if (lpFired) {
          lpFired = false;
          return;
        }
        wake();
        if (ph !== 'idle') return;
        beep(800, 0.06);
        if (mode === 'set') {
          bump();
          return render();
        }
        if (mode === 'ready') {
          if (!mem[user].length) return flash({ s: '---', d: '---', p: '---', t: 'NO DATA STORED' });
          mode = 'mem';
          mi = -1;
          return render();
        }
        mi++;
        if (mi >= mem[user].length) {
          mode = 'ready';
          mi = -1;
        }
        render();
      });
    }

    const setBtn = $('bpm-set');
    if (setBtn) {
      setBtn.onclick = () => {
        touch();
        wake();
        if (ph !== 'idle') return;
        beep(700, 0.06);
        over = null;
        if (mode === 'set') {
          setIdx++;
          if (setIdx >= SETF.length) {
            mode = 'ready';
            setIdx = 0;
          }
        } else {
          mode = 'set';
          setIdx = 0;
        }
        render();
      };
    }

    clockInterval = setInterval(() => {
      if (!on) return;
      const clkEl = $('bpm-clk');
      if (clkEl) clkEl.textContent = clkTxt();
      if (ph === 'idle' && Date.now() - lastAct > 60000) {
        on = false;
        mode = 'ready';
        over = null;
        render();
      }
    }, 1000);

    render();
    animId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('resize', resize);
      if (animId) cancelAnimationFrame(animId);
      if (clockInterval) clearInterval(clockInterval);
      if (tmr) clearTimeout(tmr);
      if (lp) clearTimeout(lp);
      if (ac) {
        try {
          ac.close();
        } catch (e) { }
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full max-w-[280px] sm:max-w-[290px] mx-auto select-none">
      <style>{`
        .bpm-stage {
          perspective: 1400px;
          width: 100%;
          margin: 0 auto;
        }
        .bpm-device {
          background: linear-gradient(155deg, #1c1730 0%, #120e24 55%, #0b0817 100%);
          border: 1px solid rgba(139, 92, 246, 0.35);
          border-radius: 36px 36px 46px 46px;
          padding: 12px 14px 16px;
          transform: rotateX(3deg) rotateY(-4deg);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.18),
                      inset 0 -8px 16px rgba(0, 0, 0, 0.75),
                      0 16px 36px -8px rgba(0, 0, 0, 0.85),
                      0 0 25px -4px rgba(124, 58, 237, 0.35);
          transition: transform .35s ease, box-shadow .35s ease;
        }
        @media (max-width: 640px) {
          .bpm-device {
            transform: rotateX(1deg) rotateY(-1deg);
            padding: 10px 12px 14px;
            border-radius: 30px 30px 38px 38px;
          }
        }
        .bpm-device:hover {
          transform: rotateX(1deg) rotateY(-2deg) translateY(-2px);
          box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.25),
                      inset 0 -8px 16px rgba(0, 0, 0, 0.75),
                      0 20px 42px -6px rgba(0, 0, 0, 0.9),
                      0 0 35px -2px rgba(139, 92, 246, 0.45);
        }
        .bpm-panel {
          background: linear-gradient(180deg, #15112a, #0d0a1b);
          border-radius: 26px;
          padding: 10px 12px 13px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: inset 0 2px 6px rgba(0,0,0,0.6),
                      0 1px 0 rgba(255,255,255,0.06);
        }
        .bpm-brand {
          text-align: center;
          font-weight: 800;
          font-size: 13px;
          letter-spacing: .22em;
          color: #ffffff;
          margin: 1px 0 6px;
          font-family: system-ui, -apple-system, sans-serif;
        }
        .bpm-brand small {
          display: block;
          font-size: 7.5px;
          letter-spacing: .24em;
          font-weight: 600;
          color: #a78bfa;
          font-family: ui-monospace, monospace;
          margin-top: 2px;
        }
        .bpm-lcd {
          background: linear-gradient(180deg, #090714, #04030a);
          border: 2px solid rgba(139, 92, 246, 0.35);
          border-radius: 9px;
          padding: 8px 10px 9px;
          color: #f1f5f9;
          box-shadow: inset 0 2px 10px rgba(0,0,0,0.9),
                      0 0 14px rgba(124, 58, 237, 0.15);
        }
        .bpm-head {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 10px;
          font-weight: 700;
          padding-bottom: 5px;
          margin-bottom: 4px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          min-height: 18px;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          color: #cbd5e1;
        }
        .bpm-heart {
          font-size: 12px;
          color: #ef4444;
          opacity: .2;
          filter: drop-shadow(0 0 4px rgba(239,68,68,0.8));
        }
        .bpm-heart.idle { animation: bpm-blink var(--bp, .83s) infinite; }
        .bpm-heart.hb { animation: bpm-hbk .4s; }
        @keyframes bpm-blink { 0%,100%{opacity:1} 35%{opacity:.2} }
        @keyframes bpm-hbk { 0%{opacity:1;transform:scale(1.35)} 100%{opacity:.2;transform:scale(1)} }
        .bpm-snd.off { opacity: .25; text-decoration: line-through; }
        .bpm-bars { display: flex; align-items: flex-end; gap: 2px; }
        .bpm-bars b { width: 4px; background: rgba(255, 255, 255, 0.1); }
        .bpm-bars b.l { background: #34d399; box-shadow: 0 0 4px rgba(52, 211, 153, 0.6); }
        .bpm-bars b:nth-child(1){height:4px}
        .bpm-bars b:nth-child(2){height:6px}
        .bpm-bars b:nth-child(3){height:8px}
        .bpm-bars b:nth-child(4){height:10px}
        .bpm-bars b:nth-child(5){height:12px}
        .bpm-m {
          visibility: hidden;
          border: 1px solid rgba(167, 139, 250, 0.4);
          padding: 0 3px;
          border-radius: 2px;
          font-size: 9px;
          color: #a78bfa;
        }
        .bpm-m.on {
          visibility: visible;
          background: #7c3aed;
          color: #ffffff;
          border-color: #8b5cf6;
          box-shadow: 0 0 6px rgba(124, 58, 237, 0.5);
        }
        .bpm-line {
          display: grid;
          grid-template-columns: 1fr 50px;
          align-items: center;
          column-gap: 8px;
          margin: 1px 0;
          height: 33px;
          max-height: 33px;
          overflow: hidden;
        }
        .bpm-line > div:first-child {
          height: 33px;
          display: flex;
          align-items: center;
          justify-content: flex-end;
        }
        .bpm-sg1 {
          fill: #f8fafc;
          filter: drop-shadow(0 0 2px rgba(248, 250, 252, 0.7));
        }
        .bpm-sg0 {
          fill: rgba(255, 255, 255, 0.04);
        }
        .bpm-fl { animation: bpm-fl 1s steps(1) infinite; }
        @keyframes bpm-fl { 50%{opacity:.1} }
        .bpm-lab {
          font-size: 11px;
          font-weight: 700;
          line-height: 1.1;
          font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
          color: #cbd5e1;
          letter-spacing: .04em;
          text-align: left;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .bpm-lab i {
          display: block;
          font-size: 8px;
          font-weight: 500;
          font-style: normal;
          color: #94a3b8;
          font-family: ui-monospace, monospace;
          letter-spacing: .02em;
          margin-top: 1px;
        }
        .bpm-wavebox {
          margin-top: 6px;
          padding: 4px 6px;
          border-radius: 6px;
          background: rgba(0, 0, 0, 0.55);
          border: 1px solid rgba(139, 92, 246, 0.2);
          box-shadow: inset 0 1px 4px rgba(0,0,0,.6);
          height: 48px;
          max-height: 48px;
          overflow: hidden;
        }
        .bpm-wavebox canvas {
          width: 100%;
          height: 40px;
          display: block;
        }
        .bpm-st {
          margin-top: 5px;
          min-height: 12px;
          font-size: 8.5px;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          letter-spacing: .06em;
          text-align: center;
          color: #a78bfa;
          font-weight: 600;
          text-shadow: 0 0 6px rgba(167, 139, 250, 0.35);
        }
        .bpm-btns {
          display: grid;
          grid-template-columns: 1fr 1.45fr 1fr;
          gap: 8px;
          margin-top: 12px;
        }
        .bpm-btns button {
          border: 1px solid rgba(255, 255, 255, 0.1);
          cursor: pointer;
          color: #e2e8f0;
          font-weight: 700;
          font-size: 10px;
          letter-spacing: .08em;
          padding: 10px 3px;
          border-radius: 14px 14px 18px 18px;
          background: linear-gradient(180deg, #262040, #19152e);
          text-shadow: 0 1px 1px rgba(0,0,0,.5);
          user-select: none;
          -webkit-user-select: none;
          touch-action: manipulation;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.18), 0 3px 0 #0e0b1c, 0 6px 10px rgba(0,0,0,.5);
          transition: transform .08s, box-shadow .08s, filter .15s;
        }
        .bpm-btns button:hover {
          filter: brightness(1.1);
        }
        .bpm-btns button:active {
          transform: translateY(3px);
          box-shadow: inset 0 1px 0 rgba(255,255,255,.18), 0 0 0 #0e0b1c, 0 2px 4px rgba(0,0,0,.5);
        }
        .bpm-btns button.bpm-go-btn {
          background: linear-gradient(180deg, #7c3aed, #4f46e5);
          border: 1px solid rgba(167, 139, 250, 0.4);
          color: #ffffff;
          box-shadow: inset 0 1px 0 rgba(255,255,255,.35), 0 3px 0 #3730a3, 0 6px 12px rgba(124,58,237,.45);
        }
        .bpm-btns button.bpm-go-btn:active {
          box-shadow: inset 0 1px 0 rgba(255,255,255,.35), 0 0 0 #3730a3, 0 2px 4px rgba(124,58,237,.3);
        }
      `}</style>

      <div className="bpm-stage">
        <div className="bpm-device">
          <div className="bpm-panel">
            {/* Brand Logo Header */}
            <div className="bpm-brand">
              KINGSTON
              <small>INSTRUMENTS • CANADA</small>
            </div>

            {/* Retro-Modern Dark OLED Clinical LCD */}
            <div className="bpm-lcd">
              <div className="bpm-head" id="bpm-head">
                <div className="flex items-center gap-1.5">
                  <span className="bpm-heart" id="bpm-hrt">♥</span>
                  <span id="bpm-usr">U1</span>
                  <span id="bpm-snd" className="bpm-snd">♪</span>
                  <span id="bpm-clk" className="ml-0.5"></span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bpm-bars" id="bpm-bars">
                    <b></b><b></b><b></b><b></b><b></b>
                  </span>
                  <span className="bpm-m" id="bpm-m">M</span>
                </div>
              </div>

              {/* SYS */}
              <div className="bpm-line">
                <div id="bpm-sys"></div>
                <div className="bpm-lab">SYS<i>mmHg</i></div>
              </div>

              {/* DIA */}
              <div className="bpm-line">
                <div id="bpm-dia"></div>
                <div className="bpm-lab">DIA<i>mmHg</i></div>
              </div>

              {/* PULSE */}
              <div className="bpm-line">
                <div id="bpm-pul"></div>
                <div className="bpm-lab">PULSE<i>/min</i></div>
              </div>

              {/* Real-time Oscillometric Waveform Canvas */}
              <div className="bpm-wavebox">
                <canvas id="bpm-wave"></canvas>
              </div>

              {/* Live Medical Status Line */}

            </div>

            {/* Tactile Push Buttons */}
            <div className="bpm-btns">
              <button id="bpm-mem" type="button">MEM</button>
              <button id="bpm-go" className="bpm-go-btn" type="button">START</button>
              <button id="bpm-set" type="button">SET</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
