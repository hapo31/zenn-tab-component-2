import "./App.css";
import Tab, { TabItem } from "./Tab2";

function App() {
  return (
    <Tab>
      <TabItem tabKey="1" title="page1">
        hoge
      </TabItem>
      <TabItem tabKey="2" title="page2">
        fuga
      </TabItem>
      <TabItem tabKey="3" title="page3">
        piyo
      </TabItem>
    </Tab>
  );
}

export default App;
