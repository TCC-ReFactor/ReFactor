import { createRequire } from 'module';const require = createRequire(import.meta.url);
import {
  index
} from "./chunk-ZBQXT5RQ.js";
import "./chunk-S6STQDT5.js";

// node_modules/@angular/platform-server/fesm2022/init.mjs
function applyShims() {
  Object.assign(globalThis, index.impl);
  globalThis["KeyboardEvent"] = index.impl.Event;
}
applyShims();
var ɵɵmoduleMarker = true;
export {
  ɵɵmoduleMarker
};
//# sourceMappingURL=@angular_platform-server_init.js.map
