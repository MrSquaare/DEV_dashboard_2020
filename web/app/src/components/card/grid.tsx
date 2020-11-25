import * as React from "react";
import {getFromLS, saveToLS} from "../../utilities/localstorage";
import {Responsive, WidthProvider} from "react-grid-layout";
import CardItemComponent from "./item";

const originalLayouts = {lg: getFromLS("layouts")} || {};

type Props = {items: object[], setItems: (items: any) => void};

const CardGridComponent: React.FunctionComponent<Props> = (props: Props) => {
    const ResponsiveGridLayout = WidthProvider(Responsive);

    const [layout, setLayout] = React.useState(originalLayouts);

    const onLayoutChange = (layout: any, layouts: any) => {
        saveToLS("layouts", layouts);
        setLayout(layouts);
    }

    const createElement = (el: any) => {
        console.log(el);

        return (
            <div key={el.i} data-grid={el}>
                <CardItemComponent divKey={el.i} setLayout={setLayout}/>
            </div>
        );
    }

    return (
        <ResponsiveGridLayout
            className="layout"
            breakpoints={{lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0}}
            cols={{lg: 4, md: 4, sm: 4, xs: 4, xxs: 2}}
            layouts={layout}
            onLayoutChange={onLayoutChange}
            rowHeight={70}
            compactType={"vertical"}
        >
            <div key={"spacer"} data-grid={{x: 0, y: 0, w: 4, h: 1, static: true}}/>
            {props.items.map((el) => createElement(el))}
        </ResponsiveGridLayout>
    );
};

export default CardGridComponent;