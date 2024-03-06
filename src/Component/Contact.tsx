import {
  DefaultButton,
  DetailsList,
  DetailsListLayoutMode,
  Dialog,
  DialogFooter,
  IColumn,
  Icon,
  IconButton,
  PrimaryButton,
  Stack,
} from "@fluentui/react";
import React from "react";
import Service from "../Service/Service";
import Loader from "./Loader";
import EditContact from "./EditContact";

const Contact = () => {
  const [loader, setLoader] = React.useState<boolean>(false);
  const [show, setShow] = React.useState<any>({ type: "", params: {} });
  const [items, setItems] = React.useState<any>([]);
  const [hideDialog, setHideDialog] = React.useState<any>({
    type: "",
    params: {},
  });
  const _columns: IColumn[] = [
    {
      key: "column1",
      name: "Name",
      fieldName: "Name",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "column2",
      name: "Email",
      fieldName: "Email",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "column2",
      name: "PhoneNumber",
      fieldName: "PhoneNumber",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "column2",
      name: "Qualification",
      fieldName: "Qualificationn",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "column2",
      name: "Address",
      fieldName: "Address",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "column2",
      name: "Country",
      fieldName: "Country",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "column2",
      name: "State",
      fieldName: "State",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "column2",
      name: "PinCode",
      fieldName: "PinCode",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "column2",
      name: "Experience",
      fieldName: "Experiencen",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "column2",
      name: "CurrentyearlyCTC",
      fieldName: "CurrentyearlyCTCC",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "column2",
      name: "ExpectedyearlyCTC",
      fieldName: "ExpectedyearlyCTCC",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "column2",
      name: "Gender",
      fieldName: "Gendern",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
    },
    {
      key: "column2",
      name: "Files",
      fieldName: "Files",
      minWidth: 100,
      maxWidth: 200,
      isResizable: true,
      onRender: (itm: any) =>
        itm?.Files?.length > 0 ? (
          <span
            onClick={() => {
              debugger;
              window.open(itm?.Files[1], "_blank");
              //  window.location.href = itm?.Files[0];
            }}
          >
            {itm.Files?.length} File
          </span>
        ) : (
          "-"
        ),
    },

    {
      key: "column2",
      name: "Actions",
      fieldName: "Actions",
      minWidth: 20,
      maxWidth: 20,
      isResizable: true,
      onRender: (itm: any) => (
        <Icon
          iconName="Edit"
          onClick={() => {
            setShow({ type: "edit", params: { id: itm?.Id } });
          }}
        />
      ),
    },

    // {
    //     key: 'column2', name: '', fieldName: '', minWidth: 20, maxWidth: 20, isResizable: true, onRender: (itm: any) => <Icon iconName="Delete" style={{ color: 'red' }}
    //         onClick={() => {
    //             setLoader(true);
    //             Service.delete(itm?.Id).finally(() => {
    //                 setLoader(false);
    //             })
    //         }} />
    // }
    {
      key: "column2",
      name: "",
      fieldName: "",
      minWidth: 20,
      maxWidth: 20,
      isResizable: true,
      onRender: (itm: any) => (
        <Icon
          iconName="Delete"
          style={{ color: "red" }}
          onClick={() => setHideDialog({ type: "c", params: { id: itm?.Id } })}
        />
      ),
    },
  ];
  const getData = () => {
    Service.getList()
      .then((res) => {
        setItems(res.data);
      })
      .finally(() => {
        setLoader(false);
      });
    return [];
  };
  React.useEffect(() => {
    getData();
  }, [loader]);
  return (
    <Stack style={{ margin: 12 }}>
      <Dialog
        hidden={hideDialog.type !== "c"}
        onDismiss={() => setHideDialog({ type: "", params: {} })}
        dialogContentProps={{ title: "Are sure to delete ?" }}
      >
        <DialogFooter>
          <PrimaryButton
            onClick={() => {
              Service.delete(hideDialog?.params?.id).finally(() => {
                setLoader(true);
                setHideDialog({ type: "", params: {} });
              });
            }}
            text="Yes"
          />
          <DefaultButton
            onClick={() => {
              setHideDialog({ type: "", params: {} });
            }}
            text="No"
          />
        </DialogFooter>
      </Dialog>

      {loader ? (
        <Loader />
      ) : (
        <>
          <PrimaryButton
            iconProps={{ iconName: "Add" }}
            text="Add"
            style={{ width: "fit-content" }}
            onClick={() => {
              setShow({ type: "edit" });
            }}
          />
          <IconButton
            className="Reloadbutton"
            title="Refresh?"
            iconProps={{ iconName: "Refresh" }}
            ariaLabel="Reload"
            onClick={() => setLoader(true)}
          />

          <DetailsList
            compact={true}
            items={items}
            columns={_columns}
            setKey="set"
            layoutMode={DetailsListLayoutMode.justified}
            selectionPreservedOnEmptyClick={true}
            ariaLabelForSelectionColumn="Toggle selection"
            ariaLabelForSelectAllCheckbox="Toggle selection for all items"
            checkButtonAriaLabel="select row"
          />
        </>
      )}
      {show.type === "edit" && (
        <EditContact
          id={show?.params?.id}
          onDismiss={() => {
            setShow({ type: "", params: {} });
          }}
        />
      )}
    </Stack>
  );
};
export default Contact;
