import { } from "jasmine";
import { TestBed } from "@angular/core/testing";
import { ContactComponent } from "./ContactComponent";
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from "@angular/platform-browser-dynamic/testing";
import { ApplicationSettings } from "../../components/ApplicationSettings";
import { PartyService } from "../../lib/party/PartyService";
import { ExpiryService } from "../../lib/ExpiryService";
import { RoleTypeProvider } from "../../../domain/Domain/RoleType";
import { MessageDisplayService } from "../../lib/MessageDisplayService";
import { NGXLogger } from "ngx-logger";

describe("contact component",
	() => {
		var contactComponent: ContactComponent;
		beforeEach(() => {
			TestBed.configureTestingModule({
			providers: [
					{provide: ApplicationSettings, useValue: {}},
					{provide: PartyService, useValue: {}},
					{provide: ExpiryService, useValue: {}},
					{provide: RoleTypeProvider, useValue: {}},
					{provide: MessageDisplayService, useValue: {}},
					{provide: NGXLogger, useValue: {}},
				],				
				declarations: [ContactComponent]
			}).compileComponents();
			// create
			var contactComponent = TestBed.get(ContactComponent);

		});

		it("save should save something",
			() => {
				contactComponent.save();
			});

	});

describe("karma sanity check",
	() => {
		it("2+1=3", () => expect(1 + 2).toBe(3));
	});
