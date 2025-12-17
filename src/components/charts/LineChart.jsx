import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

const LineChart = ({ data, dataKey, color = '#13ec5b' }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsLineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" />
        <XAxis
          dataKey="date"
          stroke="#92c9a4"
          style={{ fontSize: '12px' }}
        />
        <YAxis
          stroke="#92c9a4"
          domain={[0, 10]}
          style={{ fontSize: '12px' }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#112217',
            border: '1px solid #ffffff20',
            borderRadius: '8px',
            color: '#fff',
          }}
        />
        <Legend wrapperStyle={{ color: '#fff' }} />
        <Line
          type="monotone"
          dataKey={dataKey}
          stroke={color}
          strokeWidth={2}
          dot={{ fill: color, r: 4 }}
          activeDot={{ r: 6 }}
        />
      </RechartsLineChart>
    </ResponsiveContainer>
  )
}

export default LineChart

