import { NodeEditor, ClassicPreset } from "rete";
import type {GetSchemes} from "rete";
import { AreaPlugin, AreaExtensions } from "rete-area-plugin";
import {
    ConnectionPlugin,
    Presets as ConnectionPresets
} from "rete-connection-plugin";
import { VuePlugin, Presets } from "rete-vue-plugin";
import type {VueArea2D} from "rete-vue-plugin";
import {getDOMSocketPosition} from "rete-render-utils";
import CustomNode from "./CustomNode.vue";
import CustomSocket from "./CustomSocket.vue";
import CustomConnection from "./CustomConnection.vue";

type Schemes = GetSchemes<
    ClassicPreset.Node,
    ClassicPreset.Connection<ClassicPreset.Node, ClassicPreset.Node>
>;
type AreaExtra = VueArea2D<Schemes>;

export async function createEditor(container: HTMLElement) {
    const socket = new ClassicPreset.Socket("socket");

    const editor = new NodeEditor<Schemes>();
    const area = new AreaPlugin<Schemes, AreaExtra>(container);
    const connection = new ConnectionPlugin<Schemes, AreaExtra>();
    const render = new VuePlugin<Schemes, AreaExtra>();

    AreaExtensions.selectableNodes(area, AreaExtensions.selector(), {
        accumulating: AreaExtensions.accumulateOnCtrl()
    });

    render.addPreset(
        Presets.classic.setup({
            socketPositionWatcher: getDOMSocketPosition({
                offset({ x, y }, nodeId, side, key) {

                    return {
                        x: x + 8 * (side === 'input' ? -1 : 1),
                        y: y
                    }
                },
            }),
            customize: {
                node(context) {
                    console.log(context.payload, CustomNode);
                    if (context.payload.label === "Custom") {
                        return CustomNode;
                    }
                    return Presets.classic.Node;
                },
                socket(_) {
                    return CustomSocket;
                },
                connection(_) {
                    return CustomConnection;
                }
            }
        })
    );

    connection.addPreset(ConnectionPresets.classic.setup());

    editor.use(area);
    area.use(connection);
    area.use(render);

    AreaExtensions.simpleNodesOrder(area);

    const a = new ClassicPreset.Node("Custom");
    a.addOutput("a", new ClassicPreset.Output(socket));
    a.addInput("a", new ClassicPreset.Input(socket));
    await editor.addNode(a);

    const b = new ClassicPreset.Node("Custom");
    b.addOutput("a", new ClassicPreset.Output(socket));
    b.addInput("a", new ClassicPreset.Input(socket));
    await editor.addNode(b);

    await area.translate(b.id, { x: 320, y: 0 });

    await editor.addConnection(new ClassicPreset.Connection(a, "a", b, "a"));

    AreaExtensions.zoomAt(area, editor.getNodes());

    return () => area.destroy();
}
