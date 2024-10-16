<template>
  <span :class="classes">
    <slot></slot>
  </span>
</template>

<script lang="ts" setup>
import { computed } from "vue";

const props = defineProps<{
  type?: "primary" | "success" | "warning" | "danger";
}>();

const classes = computed(() => `ep-tag ep-tag--${props.type || "default"}`);
</script>

<style lang="less">
.ep-tag {
  display: inline-block;
  padding: 0 8px;
  border-radius: 4px;
  font-size: 12px;
  line-height: 20px;
  color: #fff;

  &--default {
    background-color: #909399;
  }
  &--primary {
    background-color: #409eff;
  }
  &--success {
    background-color: #67c23a;
  }
  &--warning {
    background-color: #e6a23c;
  }
  &--danger {
    background-color: #f56c6c;
  }
}
</style>
