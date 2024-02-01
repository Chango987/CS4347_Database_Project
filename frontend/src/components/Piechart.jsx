import { PieChart, Pie, Cell } from 'recharts';
import StockStatsTable from './StockStatsTable';

const data = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <>
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
      <text
        x={x}
        y={y + 20}
        fill="#888"
        textAnchor={x > cx ? 'start' : 'end'}
        dominantBaseline="central"
        fontSize="12"
      ></text>
    </>
  );
};

const Piechart = () => {
  return (
    <>
      <div
        className="main-container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          className="pie-container"
          style={{
            borderRadius: '1rem',
            maxWidth: '600px',
            float: 'left',
            marginRight: '10px',
            display: 'flex',

            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            boxShadow: '2px 2px 4px 1px rgba(0, 0, 0, 0.2)',
          }}
        >
          <div
            style={{
              position: 'absolute',
              paddingLeft: '5rem',
            }}
          >
            <ul style={{ listStyleType: 'none', padding: 0 }}>
              <li style={{ marginBottom: '1rem' }}>
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: 'red',
                    display: 'inline-block',
                    marginRight: '0.5rem',
                    borderRadius: '1rem',
                  }}
                ></div>
                Large Cap
              </li>
              <li style={{ marginBottom: '1rem' }}>
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: 'blue',
                    display: 'inline-block',
                    marginRight: '0.5rem',
                    borderRadius: '1rem',
                  }}
                ></div>
                Medium Cap
              </li>
              <li>
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    backgroundColor: 'yellow',
                    display: 'inline-block',
                    marginRight: '0.5rem',
                    borderRadius: '1rem',
                  }}
                ></div>
                Small Cap
              </li>
            </ul>
          </div>

          <PieChart width={600} height={400} margin={{ left: 200 }}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={160}
              fill="#8884d8"
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
          </PieChart>
        </div>
        <div
          className="performers"
          style={{
            borderRadius: '1rem',
            flex: '1',
            minWidth: '200px',
            maxWidth: '700px',
            height: '400px',
            backgroundColor: 'rgba(255, 255, 255, 0.85)',
            boxShadow: '2px 2px 4px 1px rgba(0, 0, 0, 0.2)',
          }}
        >
          <h3>Top 5 performers</h3>
          <StockStatsTable />
        </div>
      </div>
    </>
  );
};

export default Piechart;
