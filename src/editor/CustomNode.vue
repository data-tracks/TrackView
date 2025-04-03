<script setup lang="ts">
import { Ref } from 'rete-vue-plugin'

const props = defineProps<{
  'data': any,
  'emit': any,
  'seed': any,
}>()

const sortByIndex = (entries:any[]) => {
  entries.sort((a:any[], b:any[]) => {
    const ai = a[1] && a[1].index || 0
    const bi = b[1] && b[1].index || 0

    return ai - bi
  })
  return entries
}

const nodeStyles = () => {
  return {
    width: Number.isFinite(props.data.width) ? `${props.data.width}px` : '',
    height: Number.isFinite(props.data.height) ? `${props.data.height}px` : ''
  }
};
const inputs = () => {
  return sortByIndex(Object.entries(props.data.inputs))
};
const controls = () => {
  return sortByIndex(Object.entries(props.data.controls))
};
const outputs = () => {
  return sortByIndex(Object.entries(props.data.outputs))
}

</script>

<template>
  <div
      class="node bg-blue-100 rounded font-bold text-black  selected:bg-blue-100 hover:bg-blue-300"
      :class="{ selected: data.selected }"
      :style="nodeStyles()"
      data-testid="node"
  >
    <div class="title p-2 text-center" data-testid="title">{{ data.label }}</div>
    <!-- Outputs-->
    <div
        class="output"
        v-for="[key, output] in outputs()"
        :key="key + seed"
        :data-testid="'output-' + key"
    >
      <div class="output-title" data-testid="output-title">
        {{ output.label }}
      </div>
      <Ref
          class="output-socket"
          :emit="emit"
          :data="{
          type: 'socket',
          side: 'output',
          key: key,
          nodeId: data.id,
          payload: output.socket,
        }"
          data-testid="output-socket"
      />
      <div class="sources text-right" style="margin-right: -1px">
        <div class="source w-4 h-3 bg-blue-300"></div>
      </div>

    </div>
    <!-- Controls-->
    <Ref
        class="control"
        v-for="[key, control] in controls()"
        :key="key + seed"
        :emit="emit"
        :data="{ type: 'control', payload: control }"
        :data-testid="'control-' + key"
    />
    <!-- Inputs-->
    <div
        class=""
        v-for="[key, input] in inputs()"
        :key="key + seed"
        :data-testid="'input-' + key"
    >
      <Ref
          class="input-socket"
          :emit="emit"
          :data="{
          type: 'socket',
          side: 'input',
          key: key,
          nodeId: data.id,
          payload: input.socket,
        }"
          data-testid="input-socket"
      />
      <div
          class="input-title"
          v-show="!input.control || !input.showControl"
          data-testid="input-title"
      >
        {{ input.label }}
      </div>
      <Ref
          class="input-control"
          v-show="input.control && input.showControl"
          :emit="props.emit"
          :data="{ type: 'control', payload: input.control }"
          data-testid="input-control"
      />
    </div>
    <div class="destinations">
      <div class="destination w-4 h-3 bg-red-300"></div>
    </div>
  </div>
</template>

<style scoped>

</style>


<style lang="scss" scoped>
@use "sass:math";
@use "vars";

.node {
  cursor: pointer;
  box-sizing: border-box;
  width: vars.$node-width;
  height: auto;
  padding-bottom: 6px;
  position: relative;
  user-select: none;

  &.selected {
    border-color: red;
  }


  .output {
    text-align: right;
  }

  .input {
    text-align: left;
  }

  .output-socket {
    text-align: right;
    margin-right: -1px;
    display: inline-block;
  }

  .input-socket {
    text-align: left;
    margin-left: -1px;
    display: inline-block;
  }

  .input-title,
  .output-title {
    vertical-align: middle;
    color: white;
    display: inline-block;
    font-family: sans-serif;
    font-size: 14px;
    margin: vars.$socket-margin;
    line-height: vars.$socket-size;
  }

  .input-control {
    z-index: 1;
    width: calc(100% - #{vars.$socket-size + 2 * vars.$socket-margin});
    vertical-align: middle;
    display: inline-block;
  }

  .control {
    padding: vars.$socket-margin math.div(vars.$socket-size, 2) + vars.$socket-margin;
  }
}
</style>
