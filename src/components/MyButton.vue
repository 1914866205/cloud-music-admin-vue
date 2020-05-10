<template>
  <button
    :style="{ backgroundColor: color }"
    :class="{
      small: small,
      large: large,
      fixed: fixed,
      fab: fab,
      block: block,
      dark: dark
    }"
    :disabled="disabled"
    @click="handleClick($event)"
  >
    <slot name="pre-icon"></slot>
    <slot></slot>
    <slot name="suffix-icon"></slot>
  </button>
</template>

<script>
export default {
  name: 'MyButton',
  data() {
    return {}
  },
  props: {
    //小按钮
    small: {
      type: Boolean,
      default: false
    },
    //大按钮
    large: {
      type: Boolean,
      default: false
    },
    //是否禁用
    disabled: {
      type: Boolean,
      default: false
    },
    //将按钮指定为 floating-action-button
    fab: {
      type: Boolean,
      default: false
    },
    //固定定位
    fixed: {
      type: Boolean,
      default: false
    },
    //将按钮扩展到可用空间的100%
    block: {
      type: Boolean,
      default: false
    },
    //是否启用dark模式
    dark: {
      type: Boolean,
      default: false
    },
    //背景色
    color: {
      type: String,
      default: '#00bcd4'
    }
  },
  components: {},
  created() {},
  mounted() {},
  methods: {
    handleClick(event) {
      this.$emit('my-click', event)
    }
  },
  computed: {}
}
</script>

<style scoped lang="scss">
button {
  align-items: center;
  border-radius: 4px;
  display: inline-flex;
  flex: 0 0 auto;
  font-weight: 500;
  letter-spacing: 0.08em;
  justify-content: center;
  outline: 0;
  position: relative;
  text-decoration: none;
  min-width: 80px;
  height: 35px;
  padding: 3px;
  font-size: 13px;
}
.small {
  min-width: 60px;
  height: 30px;
  font-size: 12px;
}
.large {
  min-width: 100px;
  height: 40px;
  font-size: 14px;
}
.block {
  display: flex;
  flex: 1 0 auto;
  min-width: 100% !important;
}
.fab {
  min-width: 48px;
  max-width: 48px;
  height: 48px;
  border-radius: 100%;
  transition: box-shadow 0.28s cubic-bezier(0.4, 0, 0.2, 1);
  transition-property: box-shadow, opacity;
  box-shadow: 0 3px 1px -2px rgba(0, 0, 0, 0.2), 0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
}
.dark {
  background-color: rgba(0, 0, 0, 0.12);
  color: #fff;
}
.fixed {
  position: fixed;
  right: 20px;
  bottom: 20px;
}
</style>
