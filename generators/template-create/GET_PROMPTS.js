/*eslint-disable*/
module.exports = function() {
  const {templateName} = this.options;
  const YoRC = this.config.getAll();
  const templateContainerConfig = YoRC.templateContainer;
  //
  const PROMPTS = [
    // template.templateName
    {
      type: "input",
      name: "template.templateName",
      message: "What is the name for this template (the template-folder-name)?",
      default: `${templateName}`
    },
    // template.title
    {
      type: "input",
      name: "template.title",
      message: "What is the title for this template?",
      default: `${templateName} Template`
    },
    // template.description
    {
      type: "input",
      name: "template.description",
      message: "Please describe this template.",
      default(answers) {
        return `A template for ${answers.template.title}.`;
      }
    },
    // template.category (category)
    {
      type: "list",
      name: "template.category",
      message: "Please provide template sub-folder?",
      choices: ["global", "content"],
      default: "global"
    },
    // template.allowedPaths
    {
      type: "input",
      name: "template.allowedPaths",
      message:
        "What paths are allowed to access this template (comma-seperated for multiple items)?",
      default: "/content/.+"
    },
    // template.ranking
    {
      type: "input",
      name: "template.ranking",
      message: "What is the ranking for this template?",
      default: 100
    },
    {
      type: "list",
      name: "template.slingType",
      message: "Please select sling-type for this CQ template:",
      choices: ["sling:resourceSuperType", "sling:resourceType"],
      default: "sling:resourceType"
    },
    // template.resourcePath
    // template.slingType
    {
      type: "input",
      name: "template.resourcePath",
      message:
        "template-component resource path : ",
      default(answers) {
        let resourcePath = "";
        try {
          const {appName} = YoRC;
          const {category, templateName} = answers.template;
          resourcePath =
            `/apps/${appName}/src/templates/${category}/${templateName}/aem-component`;
        } catch (e) {
          console.error(e);
        }
        return resourcePath;
      }
    },
    // COMPONENT PROMPTS
    // component.slingType
    {
      type: "list",
      name: "component.slingType",
      message: "please select the sling-type for this template-component:",
      choices: ["sling:resourceSuperType", "sling:resourceType"],
      default: "sling:resourceSuperType"
    },
    // component.resourceType (2 prompts to get answer)
    {
      type: "list",
      name: "component.resourcePath",
      message: "please select the resourcePath for this component:",
      choices: templateContainerConfig.basePagePaths.concat(["others"]),
      default: templateContainerConfig.basePagePaths[1]
    },
    // TODO
    {
      when(answers) {
        if (answers.component.resourcePath === "others") {
          return true;
        } else {
          return false;
        }
      },
      type: "input",
      name: "component.resourcePath",
      message: "please specify the resourcePath for this component:"
    }
  ];

  return PROMPTS;
};
