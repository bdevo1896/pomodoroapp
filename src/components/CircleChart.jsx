export const CircleChart = ({percentage,sideLength}) => (
    <svg className="o-circleChart" viewBox="0 0 36 36">
        <path className="circle-bg"
        d="M18 2.0845
          a 15.9155 15.9155 0 0 1 0 31.831
          a 15.9155 15.9155 0 0 1 0 -31.831"
        />
        {percentage > 0 &&
        <path className="circle"
            d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
            strokeDasharray={`${percentage},100`}
        />
        }
        {/* <path className="circle"
            d="M18 2.0845
            a 15.9155 15.9155 0 0 1 0 31.831
            a 15.9155 15.9155 0 0 1 0 -31.831"
            strokeDasharray={`1000`}
            strokeDashoffset={`1000`}
        /> */}
        {/* <circle className="circle" cx="18" cy="18" r="16" strokeDasharray="1000" strokeDashoffset="1000"/> */}
        <style>{`
            
            .o-circleChart {
                display: block;
                height: ${sideLength};
                width: ${sideLength};
            }

            .o-circleChart .circle-bg {
                fill: none;
                stroke: #eeee;
                stroke-width: .2;
                width: 100%;
                height: 100%;
                overflow: hidden;
            }

            .o-circleChart .circle {
                stroke: #6442ff;
                fill: transparent;
                stroke-width: .6;
                stroke-linecap: round;
                width: 100%;
                height: 100%;
                overflow: hidden;
            }
        `}</style>
    </svg>
)