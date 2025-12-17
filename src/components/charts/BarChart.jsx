import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts'

const BarChart = ({ data, dataKey, color = '#13ec5b' }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsBarChart data={data}>
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
        <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} />
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}

export default BarChart

