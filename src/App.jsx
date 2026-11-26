import { useEffect, useRef } from 'react';

const stats = [
  { icon: 'files', value: '17', label: 'Preloaded Demo Files', color: '#2563eb' },
  { icon: 'hard-drive', value: '82 GB', label: 'Total Multi-Role Pool', color: '#10b981' },
  { icon: 'download-cloud', value: '142', label: 'Tracked Downloads', color: '#8b5cf6' },
  { icon: 'git-branch', value: '100%', label: 'Versioned Audit Trail', color: '#f59e0b' }
];

function AnalyticsChart() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    const context = canvas?.getContext('2d');

    if (!canvas || !parent || !context) {
      throw new Error('The landing analytics chart could not be initialized.');
    }

    const draw = () => {
      const width = parent.clientWidth;
      const height = 240;
      const ratio = window.devicePixelRatio || 1;
      if (!width) return;

      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.clearRect(0, 0, width, height);

      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const textColor = isDark ? '#94a3b8' : '#64748b';
      const gridColor = isDark ? '#24324f' : '#e2e8f0';
      const labels = ['Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov'];
      const values = [14, 22, 19, 31, 38, 46];
      const padding = { top: 20, right: 20, bottom: 32, left: 40 };
      const chartWidth = width - padding.left - padding.right;
      const chartHeight = height - padding.top - padding.bottom;

      context.font = '12px Inter, sans-serif';
      for (let index = 0; index <= 5; index += 1) {
        const y = padding.top + (chartHeight * index) / 5;
        context.strokeStyle = gridColor;
        context.beginPath();
        context.moveTo(padding.left, y);
        context.lineTo(width - padding.right, y);
        context.stroke();
        context.fillStyle = textColor;
        context.textAlign = 'right';
        context.fillText(String(50 - index * 10), padding.left - 8, y + 4);
      }

      const slotWidth = chartWidth / labels.length;
      const barWidth = Math.min(48, slotWidth * 0.52);
      labels.forEach((label, index) => {
        const barHeight = (values[index] / 50) * chartHeight;
        const x = padding.left + index * slotWidth + (slotWidth - barWidth) / 2;
        const y = padding.top + chartHeight - barHeight;
        const gradient = context.createLinearGradient(0, y, 0, y + barHeight);
        gradient.addColorStop(0, '#3b82f6');
        gradient.addColorStop(1, '#1d4ed8');
        context.fillStyle = gradient;
        context.beginPath();
        context.roundRect(x, y, barWidth, barHeight, [6, 6, 0, 0]);
        context.fill();
        context.fillStyle = textColor;
        context.textAlign = 'center';
        context.fillText(label, x + barWidth / 2, height - 10);
      });
    };

    const observer = new MutationObserver(draw);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });
    window.addEventListener('resize', draw);
    draw();
    if (window.lucide) window.lucide.createIcons();

    return () => {
      observer.disconnect();
      window.removeEventListener('resize', draw);
    };
  }, []);

  return <canvas ref={canvasRef} aria-label="Monthly upload volume from June to November" role="img" />;
}

export default function App() {
  return (
    <>
      <div className="stats-grid">
        {stats.map((stat) => (
          <div className="stat-card" key={stat.label}>
            <div
              className="stat-icon-box"
              style={{ background: `${stat.color}1f`, color: stat.color }}
            >
              <i data-lucide={stat.icon} width="22" height="22" aria-hidden="true" />
            </div>
            <div>
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      <div className="content-card">
        <div className="card-header-row">
          <h3 className="card-header-title">
            <i data-lucide="activity" width="20" height="20" aria-hidden="true" />
            Monthly Upload Volume Preview (Canvas API)
          </h3>
          <a href="login.html" className="btn btn-secondary btn-sm">
            View Full Analytics in Dashboard
          </a>
        </div>
        <div style={{ width: '100%', height: 240, position: 'relative' }}>
          <AnalyticsChart />
        </div>
      </div>
    </>
  );
}
