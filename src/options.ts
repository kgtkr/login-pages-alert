// @ts-ignore
import { Elm } from "./options/src/Main.elm";
import { loadData, saveData } from "./common";

const app = Elm.Main.init({
  node: document.getElementById("root"),
  flags: loadData()
});

app.ports.save.subscribe(saveData);