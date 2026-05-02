import { Line } from 'react-chartjs-2';
import { CategoryScale, Chart as ChartJS, Legend, LinearScale, LineElement, PointElement, Tooltip } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

export default function ChartCard({ title, data }) {
  return (
    <section className="card">
      <h2 className="text-lg font-bold">{title}</h2>
      <div className="mt-4 h-64">
        <Line data={data} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } } }} />
      </div>
    </section>
  );
}
