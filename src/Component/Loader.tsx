import { Spinner, SpinnerSize, Stack } from "@fluentui/react"

const Loader = () => {
    return <Stack style={{ position: 'fixed', width: '100%', top: 0, height: '100vh', background: '#dddddd73', zIndex: 1 }} horizontal horizontalAlign="center" verticalAlign="center">
        <Spinner size={SpinnerSize.large} label="Loading..." />

    </Stack>
}
export default Loader;