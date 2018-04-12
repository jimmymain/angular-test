import {} from "jasmine";
import { TestBed } from "@angular/core/testing";
import { ContactComponent } from "./ContactComponent";

beforeEach(() => {
	TestBed.configureTestingModule({
		// provide the component-under-test and dependent service
		providers: [
			ContactComponent,
			//{ provide: UserService, useClass: MockUserService }
		]
	});
	// inject both the component and the dependent service.
});

describe("contact component",
	() => {
		var contactComponent = TestBed.get(ContactComponent);
		contactComponent.save();
	});

describe("karma sanity check",
	() => {
		beforeEach(() => {
			TestBed.configureTestingModule({ providers: [] });
		});

		it("2+1=3", () => expect(1 + 2).toBe(3));
	});
