// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	let disposable = vscode.commands.registerCommand('ts-react-component-generator.generate-ts-component', (e : any) => {
		
		let rootPath = e.fsPath;
		vscode.window.showInputBox().then(function(componentName) {
			fs.mkdirSync(rootPath + '/' + componentName);
			
			var component_tsx : string =  `import React, { Component } from 'react'; 
			import './$Component$.css;

			export interface I$Component$Props {
				//Here we pass the Props Interface
				 
			}
			
			export interface I$Component$State {
				//here we pass the State Interface
			 
			}
			
			//class ComponentName Component<PropsInterface, StateInterface>
			class $Component$ extends Component<I$Component$Props, I$Component$State> {
				
				//Component State
				state = {
					 
				}
			
				//Add style here
				style = {
			 
				  };
			
				// Before the component mounts, we initialise our state
				componentWillMount() {
				   
				 }
			
				// After the component did mount, we set the state.
				componentDidMount() {
			
				}
			
				render() {
					return (
						<div style={this.style}>
						 
						</div>
					);
				}
			}
			
			export default $Component$;
			`;

			
			var component_css : string = `".$Component$ {\r\n",
            "}"`;
			
			if(componentName){
				component_tsx.replace("$Component$",componentName);
				component_css.replace("$Component$",componentName);
			
				
				fs.writeFileSync(rootPath + '/' + componentName + '/' + componentName + '.tsx', component_tsx);
				fs.writeFileSync(rootPath + '/' + componentName + '/' + componentName + '.css', component_css);
				vscode.window.showInformationMessage(componentName + ' ts component created successfully.');
			}
			else vscode.window.showInformationMessage(componentName + ' ts component was not created successfully. Please check the Name you gave!');
		});
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
