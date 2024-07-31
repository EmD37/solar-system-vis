import Plot from 'react-plotly.js'


export default function RenderArea ({ renderItem }) {

    return (
        <div className='plot-wrapper'> 
            <Plot 
                data={renderItem.data}
                frames={renderItem.frames}
                layout={renderItem.layout}
            />
        </div>
    );
}