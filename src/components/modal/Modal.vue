<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <div>
            <slot name="header" class=""></slot>
            <button
              class="modal-default-button text-base font-medium"
              @click="$emit('close')"
            >
              닫기
            </button>
          </div>

          <div class="modal-body">
            <div><slot name="image"></slot></div>
            <div class="desc-textarea">
              <slot name="description"></slot>
            </div>
          </div>
          <div class="modal-footer">
            <slot name="bottom-btn"> </slot>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>

<style>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  max-width: 448px;
  width: 95%;
  margin: 0px auto;
  padding: 20px 16px;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 10px 0 0 0;
}

.modal-default-button {
  color: #0080ff;
  float: right;
}
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
.modal-body,
.modal {
  color: #666 !important;
}

.desc-textarea {
  margin-top: 10px;
}
</style>
