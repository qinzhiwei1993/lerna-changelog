// 导入所有组件

import Element1Button from "../packages/element1-button";
import Element1Layout from "../packages/element1-layout";
import Element1Container from "../packages/element1-container";

const components = {
  Element1Button,
  Element1Layout,
  Element1Container
};

const install = function(Vue) {
  if (install.installed) return;
  install.installed = true;
  for (let obj in components) {
    let comp = components[obj];
    Vue.component(comp.name, comp);
  }
};

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
}

export default {
  install,
  version: "0.0.1",
  ...components,
};
