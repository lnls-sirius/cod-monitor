import '@testing-library/jest-dom'
import { act, fireEvent, render, screen } from '@testing-library/react';
import BaseChart from '../components/Patterns/Chart';
import ChartLegend from '../components/Patterns/ChartLegend';
import GestureRecognizer from '../components/Patterns/GestureRecognizer';
import Item from '../components/Patterns/Item';
import Led from '../components/Patterns/Led';
import Message from '../components/Patterns/Message';
import Tooltip from '../components/Patterns/Tooltip';

describe('Tooltip', () => {
    it("Component renders", async () => {
      await act(async () => {
        render(
          <Tooltip text="Test tooltip" movable={false}>
            This is a test
          </Tooltip>
        );
      });

      const element = screen.getByText(/This is a test/i);
      expect(element).toBeInTheDocument();
    })

    it('Hover is working', async () => {
      const hover_txt: string = "Test tooltip";

      await act(async () => {
        render(
            <Tooltip text="Test tooltip" movable={false}>
                <div aria-label="element">Element</div>
            </Tooltip>
        );
      });

      fireEvent.click(screen.getByText(/Element/i), {button: 1});
      expect(screen.getByText(hover_txt)).toBeInTheDocument();
    })

})

describe('Message', () => {
    it("Component renders", async () => {
        await act(async () => {
            render(
                <Message/>
            )
        })

        const ver = screen.getByText(/Action/i);
        expect(ver).toBeInTheDocument();
    })
})

describe('Led', () => {
    it("Component renders", async () => {
        await act(async () => {
            render(
                <Led
                    id='led'
                    mountData={()=>null}
                    updateData={()=>null}
                    state={true}/>
            )
        })

        const led = screen.getByTestId("led-test");
        expect(led).toBeInTheDocument();
    })

    it("Click Function", async () => {
        let state_temp = true;
        let first = true;
        await act(async () => {
            render(
                <Led
                    id='LED1'
                    mountData={()=>null}
                    updateData={(state:boolean, id: string)=>{
                        if(first){
                            first = false;
                        }else{
                            state_temp = !state_temp;
                        }
                        expect(id).toEqual('LED1');
                        expect(state).toEqual(state_temp);
                    }}
                    state={true}/>
            )
        })

        const led = screen.getByTestId("LED1-test");
        fireEvent.click(led);
        fireEvent.click(led);
        fireEvent.click(led);
    })
})

describe('Item', () => {
    it("Component renders & Click", async () => {
        await act(async () => {
            render(
                <Item
                    action={()=>null}
                    icon={'pencil'}
                    stateActive={true}
                    tooltip={'BPM1'}/>
            )
        })

        const item = screen.getByTestId("item-test");
        expect(item).toBeInTheDocument();
    })

    it("Click function", async () => {
        await act(async () => {
            render(
                <Item
                    action={function (): void {
                        expect(true).toEqual(true);
                    }}
                    icon={'pencil'}
                    stateActive={true}
                    tooltip={'BPM1'}/>
            )
        })

        const item = screen.getByTestId("item-test");
        fireEvent.click(item);

        fireEvent.click(item, {button: 1});
        expect(screen.getByText("BPM1")).toBeInTheDocument();
    })
})

describe('Gesture', () => {
    it("Component renders", async () => {
        await act(async () => {
            render(
                <GestureRecognizer
                    gestureHandler={()=>null}
                    type={'element'}>
                    <div>Test</div>
                </GestureRecognizer>
            )
        })

        const ver = screen.getByTestId("gesture");
        expect(ver).toBeInTheDocument();
    })
})

describe('ChartLegend', () => {
    it("Component renders", async () => {
        await act(async () => {
            render(
                <ChartLegend
                    color={'#FF0000'} isVisible={true}
                    deleteAction={()=>null} visibleAction={()=>null}>
                    <div>Test</div>
                </ChartLegend>
            )
        })

        const leg = screen.getByTestId("legend-item");
        const col = screen.getByTestId("color");
        expect(leg).toBeInTheDocument();
        expect(col).toBeInTheDocument();
    })
})
