export {}

declare module 'vue' {
  export interface GlobalComponents {
    AddModifyVehicle: typeof import('./components/AddModifyVehicle.vue')['default']
    AppBar: typeof import('./components/AppBar.vue')['default']
    AppFooter: typeof import('./components/AppFooter.vue')['default']
    DatePicker: typeof import('./components/DatePicker.vue')['default']
    Carousel: typeof import('./components/Carousel.vue')['default']
    CartButton: typeof import('./components/cartButton.vue')['default']
    Disclaimer: typeof import('./components/Disclaimer.vue')['default']
    Header: typeof import('./components/Header.vue')['default']
    HelloWorld: typeof import('./components/HelloWorld.vue')['default']
    Hero: typeof import('./components/Hero.vue')['default']
    OpenDialog: typeof import('./components/OpenDialog.vue')['default']
    OrderDialog: typeof import('./components/OrderDialog.vue')['default']
    LineChartComponent: typeof import('./components/LineChartComponent.vue')['default']
    ModifyApptDialog: typeof import('./components/ModifyApptDialog.vue')['default']
    RouterLink: typeof import('vue-router')['RouterLink']
    RouterView: typeof import('vue-router')['RouterView']
    Testinputcomp: typeof import('./components/testinputcomp.vue')['default']
    TextAreaInput: typeof import('./components/TextAreaInput.vue')['default']
    TextAreaInputComponent: typeof import('./components/TextAreaInputComponent.vue')['default']
    TextInput: typeof import('./components/TextInput.vue')['default']
    TextInputComponent: typeof import('./components/TextInputComponent.vue')['default']
  }
}
