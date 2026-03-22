import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

const ForecastChart = ({ forecastData, unit }) => {
  if (!forecastData || forecastData.length === 0) return null;

  const tempUnit = unit === "metric" ? "°C" : "°F";

  const chartData = forecastData.map((item) => ({
    day: new Date(item.date).toLocaleDateString("en-US", {
      weekday: "short",
    }),
    maxTemp: item.maxTemp,
    minTemp: item.minTemp,
    avgTemp: Math.round((item.maxTemp + item.minTemp) / 2),
  }));

  return (
    <div className="chart-panel">
      <h2 className="chart-heading">Temperature Trend</h2>

      <div className="chart-scroll">
        <div className="chart-container">
          <ResponsiveContainer width="100%" height={320}>
            <LineChart
              data={chartData}
              margin={{ top: 10, right: 20, left: 0, bottom: 30 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis unit={tempUnit} tick={{ fontSize: 12 }} />
              <Tooltip
                formatter={(value, name) => [`${value}${tempUnit}`, name]}
              />
              <Legend verticalAlign="bottom" height={28} />

              <Line
                type="monotone"
                dataKey="avgTemp"
                stroke="#dc2626"
                strokeWidth={3}
                name="Average"
                dot={{ r: 4 }}
              />

              <Line
                type="monotone"
                dataKey="maxTemp"
                stroke="#2563eb"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Max"
                dot={{ r: 3 }}
              />

              <Line
                type="monotone"
                dataKey="minTemp"
                stroke="#6b7280"
                strokeWidth={2}
                strokeDasharray="5 5"
                name="Min"
                dot={{ r: 3 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default ForecastChart;
