import { } from "jasmine";
import { TestBed } from "@angular/core/testing";
import { ContactComponent } from "./ContactComponent";
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";

describe("contact component",
	() => {

		beforeEach(() => {
			TestBed.configureTestingModule({
				providers: [
					ContactComponent
				]
			});
		});

		it("save should save something",
			() => {
				var contactComponent = TestBed.get(ContactComponent);
				contactComponent.save();
			});

	});

describe("karma sanity check",
	() => {
		it("2+1=3", () => expect(1 + 2).toBe(3));
	});
