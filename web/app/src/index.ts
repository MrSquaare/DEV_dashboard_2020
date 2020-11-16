import { Configuration, Core } from "@dashboard-web/core";
import DummyService from "@dashboard-web/service-dummy";

const configuration: Configuration = {
    services: [DummyService],
};
const core = new Core(configuration);

export default core;
