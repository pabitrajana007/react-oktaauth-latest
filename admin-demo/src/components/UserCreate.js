import React from 'react';
import { Create, SimpleForm, TextInput } from 'react-admin';

export const UserCreate = (props) => {
    return (
        <Create title='Create User' {...props}>
            <SimpleForm>
            <TextInput type="number" source="id" />
                <TextInput source="name" />
                <TextInput source="username" />
                <TextInput source="email" />
                <TextInput source="phone" />
                <TextInput source="company"/>
            </SimpleForm>
        </Create>
    )
}