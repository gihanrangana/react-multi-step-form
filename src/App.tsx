import Steps from "./components/Steps/Steps";
import CustomStep1 from "./groups/CustomSteps/CustomStep1";
import CustomStep2 from "./groups/CustomSteps/CustomStep2";
import useSteps from "./hooks/useSteps";

function App() {

    const steps = [
        {
            name: 'step1',
            title: 'Step 1',
            // component: 'Step 1 content',
            component: <CustomStep1 />,
        },
        {
            name: 'step2',
            title: 'Step 2',
            // component: 'Step 2 content',
            component: <CustomStep2 />,
        },
        {
            name: 'step3',
            title: 'Step 3',
            // component: 'Step 3 content',
            render: () => <div>Step 3 content</div>,
        }
    ]

    const stepGroup = useSteps(steps, 'step1');

    return (
        <div className="App">

            <Steps {...stepGroup} settings={{
                form: {
                    submitButtonLabel: "Go to Next"
                },
                prevButton: false
            }} />

        </div>
    )
}

export default App
