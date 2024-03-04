import { Dropdown, Panel, PanelType, PrimaryButton, Selection, Stack, TextField } from "@fluentui/react";
import { Formik } from "formik";
import React from "react";
import Service from "../Service/Service";
import Loader from "./Loader";
import * as Yup from "yup";

const ErrorSchema = Yup.object().shape({
    name: Yup.string()
        .required("Name is required")
        .min(2, "too Short")
        .max(15, "Too Long"),

    email: Yup.string().email("Invalid email").required("Required"),
 phonenumber: Yup.string()
         .matches(
             /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
             "Not a Phone number"
         )
     .required("Required"),

    //  qualification: Yup.string()
    //      .typeError("Please Select your qualification")

    //      .required("Required qualification"),

  address: Yup.string()
        .min(8, "Too Short!")
        .max(100, "Too Long!")
        .required("Required"),

    country: Yup.string()
        .typeError("Please Select your Country")
        .required("Required Country"),

    state: Yup.string()
        .typeError("Please Select your State")
        .required("Required State"),
     pincode: Yup.string()
         .typeError("Please Select your Pincode")
         .matches(
            /^\s*(?:\+?(\d{}))?[-. (]*(\d{2})[-. )]*(\d{3})[-. ]*(\d{2})(?: *x(\d+))?\s*$/,
            "Not a PinCode number"
         )
        .required("Required Pincode"),

     experience: Yup.string()
         .typeError("Please Select your Experience")

         .required("Required Experience"),

    // currentyearlyctc: Yup.string()
    //     .typeError("Please Select your CTC")

    //     .required("Required CTC"),

    // expectedyearlyctc: Yup.string()
    //     .typeError("Please Select your ExpectedCTC")

    //     .required("Required ExpectedCTC")
    // ,
    // gender: Yup.string().required("Gender Is Required!"),
    files: Yup.string().required("File Is Required!"),
    // phonenumber: Yup.string()
    //     .matches(
    //         /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
    //         "Not a Phone number"
    //     )
    //     .required("Required"),
  
})

const EditContact = ({ id, onDismiss, }: { id?: string, onDismiss: any,  }) => {
    const [initial, setInitial] = React.useState<any>({
        id: '',
        name: '',
        email: '',
        phonenumber: '',
        qualification: [],
        address: '',
        country: '',
        state: '',
        pincode: '',
        experience: '',
        currentyearlyctc: 0,
        expectedyearlyctc: 0,
        files: [],
        myFiles: [],
        gender: 0
    });
    const [loader, setLoader] = React.useState<boolean>(false);
    const styles: any = {
        width: 290
    }
    React.useEffect(() => {
        if (id) {
            setLoader(true)
            Service.get(id).then((res) => {
                setInitial(Object
                    .entries(res.data)
                    .reduce((carry: any, [key, value]) => {
                        carry[key.toLowerCase()] = value;

                        return carry;
                    }, {}));
                console.log("asd", Object
                    .entries(res.data)
                    .reduce((carry: any, [key, value]) => {
                        carry[key.toLowerCase()] = value;

                        return carry;
                    }, {}))
            }).finally(() => {
                setLoader(false)
            })
        }
    }, [id])
    return <>
        {loader && <Loader />}

        <Panel isOpen type={PanelType.medium} onDismiss={() => onDismiss()}>
            {!loader && <Formik
                initialValues={initial}
                onSubmit={(values, Actions) => {

                    Service.post(id ? id : "", values)
                        .finally(() => {
                            window.location.reload();
                        })
                }}
             validationSchema={ErrorSchema}
            >

                {({ values, handleSubmit, errors, handleReset, setFieldValue, touched }) => {
                    return <>

                        <Stack horizontal horizontalAlign="start" tokens={{ childrenGap: 12 }} style={{ width: '100%' }}>
                            <TextField label="Name" style={styles}
                                value={values?.name}
                                onChange={(e, v) => {
                                    setFieldValue("name", v)
                                }}
                                errorMessage={errors?.name ? errors?.name as any : ""}
                            />
                            <TextField label="Email" style={styles}
                                value={values?.email}
                                onChange={(e, v) => {
                                    setFieldValue("email", v)
                                }}
                                errorMessage={errors?.email ? errors?.email as any : ""}
                            />
                        </Stack>
                        <Stack horizontal horizontalAlign="start" tokens={{ childrenGap: 12 }} style={{ width: '100%' }}>
                            <TextField label="Phone Number" style={styles}
                                value={values?.phonenumber}
                                onChange={(e, v) => {
                                    setFieldValue("phonenumber", v)
                                }}
                                errorMessage={errors?.phonenumber ? errors?.phonenumber as any : ""}
                            />
                            <Dropdown
                                label="Qualification"
                                multiSelect
                                style={styles}
                                selectedKeys={values?.qualification}
                                onChange={(e, v) => {
                                    var d = values?.qualification;
                                    if (v?.selected) {
                                        d.push(v?.key);
                                    }
                                    else {
                                        d = d.filter((x: any) => x === v?.key);
                                    }
                                    setFieldValue("qualification", d)
                                }}
                                options={[
                                    { key: 0, text: 'BCom' },
                                    { key: 1, text: 'Bsc Computer Science.' },
                                    { key: 2, text: 'BCA' },
                                    { key: 3, text: 'BSc' },
                                    { key: 4, text: 'BBA' },
                                ]}
                                errorMessage={errors?.qualification ? errors?.qualification as any : ""}
                            />
                        </Stack>


                        <Stack horizontal horizontalAlign="start" tokens={{ childrenGap: 12 }} style={{ width: '100%' }}>
                            <TextField label="Address" style={{ width: 590 }} multiline
                                value={values?.address}
                                onChange={(e, v) => {
                                    setFieldValue("address", v)
                                }}
                                errorMessage={errors?.address ? errors?.address as any : ""}
                            />
                        </Stack>
                        <Stack horizontal horizontalAlign="start" tokens={{ childrenGap: 12 }} style={{ width: '100%' }}>
                            <TextField label="State" style={styles}
                                value={values?.state}
                                onChange={(e, v) => {
                                    setFieldValue("state", v)
                                }}
                                errorMessage={errors?.state ? errors?.state as any : ""}
                            />
                            <TextField label="Country" style={styles}
                                value={values?.country}
                                onChange={(e, v) => {
                                    setFieldValue("country", v)
                                }}
                                errorMessage={errors?.country ? errors?.country as any : ""}
                            />

                        </Stack>
                        <Stack horizontal horizontalAlign="start" tokens={{ childrenGap: 12 }} style={{ width: '100%' }}>
                            <TextField label="Pincode" style={styles}
                                value={values?.pincode}
                                onChange={(e, v) => {
                                    setFieldValue("pincode", v)
                                }}
                                errorMessage={errors?.pincode ? errors?.pincode as any : ""}
                            />
                            <Dropdown
                                label="Experience"
                                style={styles}
                                selectedKey={values?.experience}
                                onChange={(e, v) => {
                                    setFieldValue("experience", v?.key)
                                }}
                                options={[
                                    { key: 0, text: 'Freher ' },
                                    { key: 1, text: '1-2 Years' },
                                    { key: 2, text: '2-3 Years' },
                                    { key: 3, text: '3-4 Years' },
                                    { key: 4, text: '4+Years' },
                                ]}
                                errorMessage={errors?.experience ? errors?.experience as any : ""}
                            />
                        </Stack>
                        <Stack horizontal horizontalAlign="start" tokens={{ childrenGap: 12 }} style={{ width: '100%' }}>
                            <Dropdown
                                label="Current yearly CTC"
                                style={styles}
                                selectedKey={values?.currentyearlyctc}
                                onChange={(e, v) => {
                                    setFieldValue("currentyearlyctc", v?.key)
                                }}
                                options={[
                                    { key: 0, text: '7 LPA in hand salary' },
                                    { key: 1, text: '8 LPA in hand salary' },
                                    { key: 2, text: '9 LPA in hand salary' },
                                    { key: 3, text: '10 LPA in hand salary' },
                                    { key: 4, text: '11 LPA in hand salary' },
                                ]}
                                errorMessage={errors?.currentyearlyctc ? errors?.currentyearlyctc as any : ""}
                            />
                            <Dropdown
                                label="Expected yearly CTC"
                                style={styles}
                                selectedKey={values?.expectedyearlyctc}
                                onChange={(e, v) => {
                                    setFieldValue("expectedyearlyctc", v?.key)
                                }}
                                options={[
                                    { key: 0, text: '8 LPA in hand salary' },
                                    { key: 1, text: '9 LPA in hand salary' },
                                    { key: 2, text: '10 LPA in hand salary' },
                                    { key: 3, text: '11 LPA in hand salary' },
                                    { key: 4, text: '12 LPA in hand salary' },
                                ]}
                                errorMessage={errors?.expectedyearlyctc ? errors?.expectedyearlyctc as any : ""}
                            />
                        </Stack>
                        <Stack style={{ margin: '12px 0' }} horizontal horizontalAlign="start" >
                            <input type="file" onChange={(e) => {
                                var file: any = e.target.files;
                                setFieldValue("myFiles", file);
                            }}
                          //  errorMessage={errors?.files ? errors?.files  as any : ""}
                            />
                        </Stack>
                        <Dropdown
                            label="Gender"
                            style={styles}
                            selectedKey={values?.gender}
                            onChange={(e, v) => {
                                setFieldValue("gender", v?.key)
                            }}
                            options={[
                                { key: 0, text: 'Male' },
                                { key: 1, text: 'Female' },
                            ]}
                            errorMessage={errors?.gender ? errors?.gender as any : ""}
                        />
                        {/* <Stack style={{ position: 'absolute', right: 10, bottom: 10 }}>
                            <input type="button" value="Submit"
                                onClick={() => handleSubmit()} />
                        </Stack> */}

                        <Stack style={{ position: 'absolute', right: 10, bottom: 10 }}>
                            <PrimaryButton text="Submit" iconProps={{ iconName: 'Save' }} type="submit" onClick={() => handleSubmit()} />
                        </Stack>

                    </>
                }}

            </Formik>}

        </Panel>
    </>
}
export default EditContact;