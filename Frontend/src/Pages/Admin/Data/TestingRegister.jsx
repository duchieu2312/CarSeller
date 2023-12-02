import { List,Datagrid,TextField,EditButton,Edit,Create,SimpleForm,TextInput,useRecordContext, DeleteButton, Show, SimpleShowLayout} from "react-admin";

// Tạo một thành phần để hiển thị tiêu đề của trang chỉnh sửa
const TestingRegisterTitle = () => {
    const record = useRecordContext();
    return <span>ID {record ? `"${record.id}"` : ''}</span>;
  };
  
// Component cho trang danh sách
export const TestingRegisterList = (props) => (
<List {...props}>
    <Datagrid rowClick="show">
        <TextField source="id" />
        <TextField source="fullName" />
        <TextField source="email" />
        <TextField source="numberPhone" />
        <TextField source="versionId" />
        <TextField source="status" />
        <EditButton />
        <DeleteButton />
    </Datagrid>
</List>
);

// Component cho trang chỉnh sửa
export const TestingRegisterEdit = (props) => (
<Edit title={<TestingRegisterTitle />} {...props}>
    <SimpleForm>
        <TextInput disabled source="id" />
        <TextInput source="status" />
    </SimpleForm>
</Edit>
);

// Component cho trang hiển thị chi tiết
export const TestingRegisterShow = (props) => (
<Show title={<TestingRegisterTitle />} {...props}>
    <SimpleShowLayout>
        <TextField source="id" />
        <TextField source="carpd" />
        <TextField source="distributionCenter" />
        <TextField source="email" />
        <TextField source="fullName" />
        <TextField source="numberPhone" />
        <TextField source="status" />
        <TextField source="versionId" />
    </SimpleShowLayout>
</Show>
);