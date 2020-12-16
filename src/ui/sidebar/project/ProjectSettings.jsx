import Tab from "ui/common/Tab";

const ProjectSettings = () => {
  return (
    <Tab title="Project Settings">
      <label htmlFor="show-grid">Show grid</label>
      <input type="checkbox" name="show-grid" />
    </Tab>
  );
};

export default ProjectSettings;
