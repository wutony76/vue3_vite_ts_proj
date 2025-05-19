<script setup lang="ts">
const props = defineProps<{
  index: number;
  height: number;
  text: {
    type: string,
    default: 'sample'
  };
  isActive: boolean;
}>();
</script>

<template>
  <div class="card" :class="`card-${props.index} ${props.isActive ? 'active' : ''}`"
    :style="{ height: props.height + 'px' }">
    <div class="content">
      <div class="label">{{ props.text ? props.text.toUpperCase() : '' }}</div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card {
  background: linear-gradient(135deg, #2a0303 0%, #b14c4a 100%);
  border-radius: 8px;
  padding: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  transition: all 0.3s ease;

  width: 20%;
  height: 330px;
  align-items: flex-start;
  position: relative;

  .content {
    width: 100%;
    background: #fff;
    position: relative;
    height: 30px;

    .label {
      font-size: 44px;
      font-weight: 700;
    }
  }

  // card hover
  &.active,
  &:hover {
    transform: translateY(-50px);
    cursor: pointer;

    &::after {
      content: "";
      background: #a7a7a7;
      position: absolute;
      left: 0;
      bottom: -50px;
      width: 100%;
      height: 30px;
      z-index: 10;
    }
  }

  &.card-1 {
    // background: #ff6981;
    background: linear-gradient(135deg, #ff6981 0%, #f4284a 150%);
    border-radius: 10px 98px 0 0;
    padding-right: 0px;

    .content {
      .label {
        color: #ff6981;
        position: absolute;
        top: -19px;
        left: -1px;
        white-space: nowrap;
        letter-spacing: -13px;
        transition: letter-spacing 0.3s ease;
      }
    }

    &.active,
    &:hover {
      .label {
        letter-spacing: -1px;
      }

      &::after {
        background: #f4284a;
      }
    }
  }

  &.card-2 {
    background: #ffd269;
    background: linear-gradient(135deg, #ffd269 0%, #ffa333 150%);
    border-radius: 0 20px 0 10px;

    .content {
      background: unset;

      .label {
        color: #ffd269;
        position: absolute;
        top: -65px;
        left: -17px;
        white-space: nowrap;
        letter-spacing: -13px;
        transition: letter-spacing 0.3s ease;
      }
    }

    &.active,
    &:hover {
      .label {
        letter-spacing: -1px;
      }

      &::after {
        background: #ffa333;
      }
    }
  }

  &.card-3 {
    // background: #ff79dd;
    background: linear-gradient(135deg, #ff79dd 0%, #f52b8c 150%);
    border-radius: 50px 13px;

    .content {
      background: unset;

      .label {
        color: #ff79dd;
        position: absolute;
        top: -65px;
        left: 26%; // 26%
        white-space: nowrap;
        letter-spacing: -13px;
        transition: letter-spacing 0.3s ease, left 0.3s ease;
      }
    }

    &.active,
    &:hover {
      .label {
        left: 15%;
        letter-spacing: -1px;
      }

      &::after {
        background: #f52b8c;
      }
    }
  }

  &.card-4 {
    background: #71de95;
    background: linear-gradient(135deg, #71de95 0%, #2ad841 150%);
    border-radius: 108px 3px 10px 18px;

    .content {
      background: unset;

      .label {
        color: #71de95;
        position: absolute;
        top: -65px;
        right: -5px;
        white-space: nowrap;
        letter-spacing: -13px;
        transition: letter-spacing 0.3s ease;
      }
    }

    &.active,
    &:hover {
      .label {
        letter-spacing: -1px;
      }

      &::after {
        background: #2ad841;
      }
    }
  }

  &.card-5 {
    background: #4ccae0;
    background: linear-gradient(135deg, #4ccae0 0%, #2dabff 150%);
    border-radius: 10px 0px 0 70px;
    padding-left: 0px;
    padding-right: 30px;

    .content {
      height: 30px;

      .label {
        color: #4ccae0;
        position: absolute;
        top: -19px;
        right: 9px;
        white-space: nowrap;
        letter-spacing: -13px;
        transition: letter-spacing 0.3s ease;
      }
    }

    &.active,
    &:hover {
      .label {
        letter-spacing: -1px;
      }

      &::after {
        background: #2dabff;
      }
    }

  }




  .stat-icon {
    font-size: 24px;
    color: #fff;
    text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
  }


  .stat-content {
    .stat-value {
      font-size: 24px;
      color: #fff;
      font-weight: bold;
      text-shadow: 0 0 10px rgba(255, 255, 255, 0.3);
    }

    .stat-label {
      font-size: 14px;
      color: rgba(255, 255, 255, 0.8);
    }
  }
}
</style>