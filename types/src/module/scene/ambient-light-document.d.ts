import { AmbientLightPF2e } from "@module/canvas";
import { ScenePF2e } from ".";
declare class AmbientLightDocumentPF2e<TParent extends ScenePF2e | null = ScenePF2e | null> extends AmbientLightDocument<TParent> {
    /** Is this light actually a source of darkness? */
    get isDarkness(): boolean;
}
interface AmbientLightDocumentPF2e<TParent extends ScenePF2e | null = ScenePF2e | null> extends AmbientLightDocument<TParent> {
    get object(): AmbientLightPF2e<this> | null;
}
export { AmbientLightDocumentPF2e };
