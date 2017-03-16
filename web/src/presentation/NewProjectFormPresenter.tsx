import * as React from "react";
import { Button, Container, Form, Label } from "semantic-ui-react";

export class NewProjectFormPresenter extends React.Component<INewProjectFormProps, undefined> {
    public render() {
        return <Form className="ui fluid form">
                <Form.Field error={!this.props.nameIsValid}>
                        <input value={this.props.name} placeholder="Enter a name for the project" onChange={(e) => { this.props.nameOnChange((e as any).target.value); } }/>
                        {!this.props.nameIsValid && <Label basic color="red" pointing>{this.props.nameValidationMessage}</Label>}                     
                </Form.Field>
                <br/>
                <Button primary fluid onClick={this.submit}>Create project</Button>
            </Form>;
    }

    private submit = (e: any) => {
        e.preventDefault();
        this.props.submit(this.props);
    }
}

export interface INewProjectFormProps {
    name?: string;
    nameOnChange?: (name: string) => void;
    nameIsValid?: boolean;
    nameValidationMessage?: string;
    submit?: (props: INewProjectFormProps) => void;
}
