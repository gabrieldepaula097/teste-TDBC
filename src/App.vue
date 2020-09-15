<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
#app {
  font-family: Montserrat;
  height: 100vh;
}
.allignCenter {
  display: flex;
  align-items: center;
  justify-content: center;
}

.allignStart {
  display: flex !important;
  align-items: center;
  justify-content: flex-start;
}

.allignEnd {
  display: flex !important;
  align-items: center;
  justify-content: flex-end;
}

.allignBetween {
  display: flex !important;
  align-items: center;
  justify-content: space-between;
}

.h-100 {
  height: 100vh;
}
.p-0 {
  padding: 0 !important;
}
.pt-0 {
  padding-top: 0 !important;
}

.m-0 {
  margin: 0 !important;
}
.datepicker .datepicker-header {
  border-bottom: 0 !important;
  margin-bottom: 0rem !important;
}

.dropdown.is-inline .dropdown-menu,
.datepicker .datepicker-table {
  width: 100% !important;
}

.datepicker .datepicker-table .datepicker-body .datepicker-cell.is-selected {
  border-radius: 13.6909px !important;
}
.dropdown-item,
.dropdown .dropdown-menu .has-link a {
  line-height: 1.4 !important;
}
</style>
