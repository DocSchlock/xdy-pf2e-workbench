import * as smooth from "@pixi/graphics-smooth";
import * as particles from "@pixi/particle-emitter";
import {
    ALPHA_MODES,
    AccessibilityManager,
    AlphaFilter,
    Application,
    BLEND_MODES,
    BlurFilter,
    CLEAR_MODES,
    Circle,
    Container,
    DisplayObject,
    Ellipse,
    EventBoundary,
    Extract,
    FederatedEvent,
    FederatedPointerEvent,
    Filter,
    FilterState,
    FilterSystem,
    Geometry,
    Graphics,
    IDestroyOptions,
    ITextStyle,
    Graphics as LegacyGraphics,
    Mesh,
    ParticleContainer,
    ParticleRenderer,
    Point,
    Polygon,
    Prepare,
    Program,
    Rectangle,
    RenderTexture,
    Renderer,
    RoundedRectangle,
    Shader,
    Sprite,
    Text,
    TextStyle,
    Texture,
    TilingSpriteRenderer,
    Transform,
    UniformGroup,
    utils,
} from "pixi.js";
import "./canvas.d.ts";
import "./core/index.d.ts";
import "./groups/index.d.ts";
import "./layers/controls/ruler.d.ts";
import "./layers/effects/visibility.d.ts";
import "./perception/index.d.ts";
import "./placeables/index.d.ts";
import "./sources/index.d.ts";
import "./webgl/index.d.ts";

declare global {
    module PIXI {
        export {
            AccessibilityManager,
            AlphaFilter,
            Application,
            ALPHA_MODES,
            BLEND_MODES,
            BlurFilter,
            CLEAR_MODES,
            Circle,
            Container,
            DisplayObject,
            Ellipse,
            EventBoundary,
            Extract,
            FederatedEvent,
            FederatedPointerEvent,
            Filter,
            FilterState,
            FilterSystem,
            Geometry,
            Graphics,
            IDestroyOptions,
            ITextStyle,
            LegacyGraphics,
            Mesh,
            ParticleContainer,
            ParticleRenderer,
            Point,
            Polygon,
            Prepare,
            Program,
            Rectangle,
            RenderTexture,
            Renderer,
            RoundedRectangle,
            Shader,
            Sprite,
            Text,
            TextStyle,
            Texture,
            TilingSpriteRenderer,
            Transform,
            UniformGroup,
            particles,
            smooth,
            utils,
        };
    }
}
