import * as ICONS from "./icon-exporter";
export type IconNameT = keyof typeof ICONS;

type RenderIconPropsT = {
    iconName: IconNameT;
    className?: string;
};
/**
 * use this component to render icon component from iconName.
 * please first export your icons in icon-exporter.ts file and use this component freely.
 */
export function RenderIcon({ iconName, className }: RenderIconPropsT) {
    if (!iconName) {
        return null;
    }
    const IconComponent = ICONS[iconName];
    if (!IconComponent) {
        return null;
    }
    return <IconComponent className={className} />;
}
