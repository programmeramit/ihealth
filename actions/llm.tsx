import * as  z from "zod"

import {createAgent,tool} from "langchain"

const getWeather = tool(
    (input:string)=>`Its weather in the city of the ${input}`,
    {
        name:"get_weather",
        description:'Get the weather for the given city',
        schema:z.object({
            city:z.string().describe("The city weather")
        })
    }
)
