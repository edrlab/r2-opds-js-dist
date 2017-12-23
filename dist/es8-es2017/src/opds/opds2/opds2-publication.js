"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ta_json_1 = require("ta-json");
const opds2_belongsTo_1 = require("./opds2-belongsTo");
const opds2_collection_1 = require("./opds2-collection");
const opds2_contributor_1 = require("./opds2-contributor");
const opds2_link_1 = require("./opds2-link");
const opds2_publicationMetadata_1 = require("./opds2-publicationMetadata");
let OPDSPublication = class OPDSPublication {
    findFirstLinkByRel(rel) {
        return this.Links ? this.Links.find((l) => {
            return l.HasRel(rel);
        }) : undefined;
    }
    AddImage(href, typeImage, height, width) {
        const i = new opds2_link_1.OPDSLink();
        i.Href = href;
        i.TypeLink = typeImage;
        if (height) {
            i.Height = height;
        }
        if (width) {
            i.Width = width;
        }
        if (!this.Images) {
            this.Images = [];
        }
        this.Images.push(i);
    }
    AddLink(href, typeLink, rel, title) {
        const l = new opds2_link_1.OPDSLink();
        l.Href = href;
        l.TypeLink = typeLink;
        if (rel) {
            l.AddRel(rel);
        }
        if (title) {
            l.Title = title;
        }
        if (!this.Links) {
            this.Links = [];
        }
        this.Links.push(l);
    }
    AddAuthor(name, identifier, sortAs, href, typeLink) {
        const c = new opds2_contributor_1.OPDSContributor();
        c.Name = name;
        if (identifier) {
            c.Identifier = identifier;
        }
        if (sortAs) {
            c.SortAs = sortAs;
        }
        const l = new opds2_link_1.OPDSLink();
        if (href) {
            l.Href = href;
        }
        if (typeLink) {
            l.TypeLink = typeLink;
        }
        if (href) {
            c.Links = [];
            c.Links.push(l);
        }
        if (!this.Metadata) {
            this.Metadata = new opds2_publicationMetadata_1.OPDSPublicationMetadata();
        }
        if (!this.Metadata.Author) {
            this.Metadata.Author = [];
        }
        this.Metadata.Author.push(c);
    }
    AddSerie(name, position, href, typeLink) {
        const c = new opds2_collection_1.OPDSCollection();
        c.Name = name;
        c.Position = position;
        const l = new opds2_link_1.OPDSLink();
        if (href) {
            l.Href = href;
        }
        if (typeLink) {
            l.TypeLink = typeLink;
        }
        if (href) {
            c.Links = [];
            c.Links.push(l);
        }
        if (!this.Metadata) {
            this.Metadata = new opds2_publicationMetadata_1.OPDSPublicationMetadata();
        }
        if (!this.Metadata.BelongsTo) {
            this.Metadata.BelongsTo = new opds2_belongsTo_1.OPDSBelongsTo();
        }
        if (!this.Metadata.BelongsTo.Series) {
            this.Metadata.BelongsTo.Series = [];
        }
        this.Metadata.BelongsTo.Series.push(c);
    }
    AddPublisher(name, href, typeLink) {
        const c = new opds2_contributor_1.OPDSContributor();
        c.Name = name;
        const l = new opds2_link_1.OPDSLink();
        if (href) {
            l.Href = href;
        }
        if (typeLink) {
            l.TypeLink = typeLink;
        }
        if (href) {
            c.Links = [];
            c.Links.push(l);
        }
        if (!this.Metadata) {
            this.Metadata = new opds2_publicationMetadata_1.OPDSPublicationMetadata();
        }
        if (!this.Metadata.Publisher) {
            this.Metadata.Publisher = [];
        }
        this.Metadata.Publisher.push(c);
    }
    _OnDeserialized() {
        if (!this.Metadata) {
            console.log("OPDSPublication.Metadata is not set!");
        }
        if (!this.Links) {
            console.log("OPDSPublication.Links is not set!");
        }
        if (!this.Images) {
            console.log("OPDSPublication.Images is not set!");
        }
    }
};
tslib_1.__decorate([
    ta_json_1.JsonProperty("metadata"),
    tslib_1.__metadata("design:type", opds2_publicationMetadata_1.OPDSPublicationMetadata)
], OPDSPublication.prototype, "Metadata", void 0);
tslib_1.__decorate([
    ta_json_1.JsonProperty("links"),
    ta_json_1.JsonElementType(opds2_link_1.OPDSLink),
    tslib_1.__metadata("design:type", Array)
], OPDSPublication.prototype, "Links", void 0);
tslib_1.__decorate([
    ta_json_1.JsonProperty("images"),
    ta_json_1.JsonElementType(opds2_link_1.OPDSLink),
    tslib_1.__metadata("design:type", Array)
], OPDSPublication.prototype, "Images", void 0);
tslib_1.__decorate([
    ta_json_1.OnDeserialized(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], OPDSPublication.prototype, "_OnDeserialized", null);
OPDSPublication = tslib_1.__decorate([
    ta_json_1.JsonObject()
], OPDSPublication);
exports.OPDSPublication = OPDSPublication;
//# sourceMappingURL=opds2-publication.js.map