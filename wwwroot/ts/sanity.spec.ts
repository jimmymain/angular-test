import { TestBed } from "@angular/core/testing";
import {} from "jasmine";

describe("karma sanity check",
    () => {
        beforeEach(() =>
        {
            TestBed.configureTestingModule({ providers: [] });
        });

        it("1+1=2", () => expect(1 + 1).toBe(2));
    });