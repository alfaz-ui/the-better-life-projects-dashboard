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
import { useTheme } from '../../context/ThemeContext'

const CustomTooltip = ({ active, payload, label, isDark }) => {
  if (!active || !payload || !payload.length) return null

  const data = payload[0]?.payload
  const tooltipBg = isDark ? '#112217' : '#ffffff'
  const tooltipBorder = isDark ? '#ffffff20' : '#e5e7eb'
  const tooltipText = isDark ? '#fff' : '#111827'
  const labelColor = isDark ? '#92c9a4' : '#6b7280'

  return (
    <div
      style={{
        backgroundColor: tooltipBg,
        border: `1px solid ${tooltipBorder}`,
        borderRadius: '8px',
        padding: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      }}
    >
      <p style={{ color: labelColor, marginBottom: '8px', fontWeight: 'bold' }}>
        {label}
      </p>
      {data?.phase && (
        <p style={{ color: labelColor, fontSize: '12px', marginBottom: '8px' }}>
          Phase: <span style={{ color: tooltipText, textTransform: 'capitalize' }}>{data.phase}</span>
        </p>
      )}
      {payload.map((entry, index) => (
        <p key={index} style={{ color: tooltipText, marginBottom: '4px' }}>
          <span style={{ color: entry.color }}>●</span> {entry.name}: <strong>{entry.value}</strong>
        </p>
      ))}
      {data?.allMetrics && (
        <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: `1px solid ${tooltipBorder}` }}>
          <p style={{ color: labelColor, fontSize: '11px', marginBottom: '4px' }}>All Metrics:</p>
          {Object.entries(data.allMetrics).map(([key, value]) => (
            <p key={key} style={{ color: tooltipText, fontSize: '11px', marginBottom: '2px' }}>
              {key}: {value}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}

const BarChart = ({ data, dataKey, color = '#13ec5b' }) => {
  const { isDark } = useTheme()
  const gridColor = isDark ? '#ffffff10' : '#e5e7eb'
  const axisColor = isDark ? '#92c9a4' : '#6b7280'
  const legendColor = isDark ? '#fff' : '#111827'

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsBarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke={gridColor} />
        <XAxis
          dataKey="date"
          stroke={axisColor}
          style={{ fontSize: '12px' }}
        />
        <YAxis
          stroke={axisColor}
          domain={[0, 10]}
          style={{ fontSize: '12px' }}
        />
        <Tooltip
          content={<CustomTooltip isDark={isDark} />}
        />
        <Legend wrapperStyle={{ color: legendColor }} />
        <Bar dataKey={dataKey} fill={color} radius={[4, 4, 0, 0]} />
      </RechartsBarChart>
    </ResponsiveContainer>
  )
}

export default BarChart

