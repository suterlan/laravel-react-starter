// import the core library.
import ReactEChartsCore from 'echarts-for-react/lib/core';
// Import the echarts core module, which provides the necessary interfaces for using echarts.
import * as echarts from 'echarts/core';
// Import charts, all with Chart suffix
import {
	// LineChart,
	BarChart,
	PieChart,
	// ScatterChart,
	// RadarChart,
	// MapChart,
	// TreeChart,
	// TreemapChart,
	// GraphChart,
	// GaugeChart,
	// FunnelChart,
	// ParallelChart,
	// SankeyChart,
	// BoxplotChart,
	// CandlestickChart,
	// EffectScatterChart,
	// LinesChart,
	// HeatmapChart,
	// PictorialBarChart,
	// ThemeRiverChart,
	// SunburstChart,
	// CustomChart,
} from 'echarts/charts';
// import components, all suffixed with Component
import {
	// GridSimpleComponent,
	GridComponent,
	// PolarComponent,
	// RadarComponent,
	// GeoComponent,
	// SingleAxisComponent,
	// ParallelComponent,
	// CalendarComponent,
	// GraphicComponent,
	// ToolboxComponent,
	TooltipComponent,
	// AxisPointerComponent,
	// BrushComponent,
	TitleComponent,
	// TimelineComponent,
	// MarkPointComponent,
	// MarkLineComponent,
	// MarkAreaComponent,
	LegendComponent,
	// LegendScrollComponent,
	// LegendPlainComponent,
	// DataZoomComponent,
	// DataZoomInsideComponent,
	// DataZoomSliderComponent,
	// VisualMapComponent,
	// VisualMapContinuousComponent,
	// VisualMapPiecewiseComponent,
	// AriaComponent,
	// TransformComponent,
	DatasetComponent,
} from 'echarts/components';
// Import renderer, note that introducing the CanvasRenderer or SVGRenderer is a required step
import {
	CanvasRenderer,
	// SVGRenderer,
} from 'echarts/renderers';

// Register the required components
echarts.use([
	TitleComponent,
	TooltipComponent,
	GridComponent,
	LegendComponent,
	DatasetComponent,
	BarChart,
	PieChart,
	CanvasRenderer
]
);

type RoleDistribution = { name: string; users_count: number }[];

export function RolePieChart({ roleDistribution = [] }: { roleDistribution?: RoleDistribution }) {
	const option = {
		tooltip: { trigger: 'item' },
		legend: { orient: 'vertical', left: 'left', textStyle: { color: '#6b7280' } },
		series: [
			{
				name: 'Users',
				type: 'pie',
				radius: '50%',
				data: roleDistribution.map(role => ({ name: role.name, value: role.users_count })),
				emphasis: {
					itemStyle: {
						shadowBlur: 10,
						shadowOffsetX: 0,
						shadowColor: 'rgba(0, 0, 0, 0.5)',
					},
				},
				label: {
					color: '#6b7280'
				},
			},
		],
	};

	return (
		<div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
			<h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">User Distribution by Role</h2>
			<ReactEChartsCore
				echarts={echarts}
				option={option}
				style={{ height: 300, width: '100%' }}
				notMerge={true}
				lazyUpdate={true}
			/>
		</div>
	);
}

export function RoleBarChart({ roleDistribution = [] }: { roleDistribution?: RoleDistribution }) {
	const option = {
		tooltip: {},
		xAxis: {
			type: 'category',
			data: roleDistribution.map(role => role.name),
			axisLabel: {
				rotate: 0,
				color: '#6b7280',
			},
		},
		yAxis: {
			type: 'value',
			axisLabel: {
				color: '#6b7280',
			},
		},
		series: [
			{
				data: roleDistribution.map(role => role.users_count),
				type: 'bar',
				animation: true,
				animationDuration: 1000,
				animationEasing: 'cubicOut',
				itemStyle: {
					color: '#3b82f6',
				},
				barWidth: '50%',
			},
		],
	};

	return (
		<div className="bg-white dark:bg-slate-800 p-4 rounded-lg shadow">
			<h2 className="text-lg font-semibold text-slate-800 dark:text-white mb-4">Users per Role</h2>
			<ReactEChartsCore
				echarts={echarts}
				option={option}
				style={{ height: 300, width: '100%' }}
				notMerge={true}
				lazyUpdate={true}
			/>
		</div>
	);
}
