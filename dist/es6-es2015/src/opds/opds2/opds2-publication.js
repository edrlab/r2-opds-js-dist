"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OPDSPublication = void 0;
const tslib_1 = require("tslib");
const ta_json_x_1 = require("ta-json-x");
const metadata_1 = require("r2-shared-js/dist/es6-es2015/src/models/metadata");
const metadata_belongsto_1 = require("r2-shared-js/dist/es6-es2015/src/models/metadata-belongsto");
const metadata_contributor_1 = require("r2-shared-js/dist/es6-es2015/src/models/metadata-contributor");
const publication_link_1 = require("r2-shared-js/dist/es6-es2015/src/models/publication-link");
const opds2_link_1 = require("./opds2-link");
const METADATA_JSON_PROP = "metadata";
const LINKS_JSON_PROP = "links";
const IMAGES_JSON_PROP = "images";
const IMAGE_JSON_PROP = "image";
let OPDSPublication = class OPDSPublication {
    findFirstLinkByRel(rel) {
        return this.Links ? this.Links.find((l) => {
            return l.HasRel(rel);
        }) : undefined;
    }
    AddImage(href, typeImage, height, width) {
        const i = new publication_link_1.Link();
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
    AddLink_(href, typeLink, rel, title) {
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
        const c = new metadata_contributor_1.Contributor();
        c.Name = name;
        if (identifier) {
            c.Identifier = identifier;
        }
        if (sortAs) {
            c.SortAs = sortAs;
        }
        const l = new publication_link_1.Link();
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
            this.Metadata = new metadata_1.Metadata();
        }
        if (!this.Metadata.Author) {
            this.Metadata.Author = [];
        }
        this.Metadata.Author.push(c);
    }
    AddSerie(name, position, href, typeLink) {
        const c = new metadata_contributor_1.Contributor();
        c.Name = name;
        c.Position = position;
        const l = new publication_link_1.Link();
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
            this.Metadata = new metadata_1.Metadata();
        }
        if (!this.Metadata.BelongsTo) {
            this.Metadata.BelongsTo = new metadata_belongsto_1.BelongsTo();
        }
        if (!this.Metadata.BelongsTo.Series) {
            this.Metadata.BelongsTo.Series = [];
        }
        this.Metadata.BelongsTo.Series.push(c);
    }
    AddPublisher(name, href, typeLink) {
        const c = new metadata_contributor_1.Contributor();
        c.Name = name;
        const l = new publication_link_1.Link();
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
            this.Metadata = new metadata_1.Metadata();
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
        if (!this.Images && !this.Image) {
            console.log("OPDSPublication.Image[s] is not set!");
        }
    }
};
exports.OPDSPublication = OPDSPublication;
tslib_1.__decorate([
    (0, ta_json_x_1.JsonProperty)(METADATA_JSON_PROP),
    tslib_1.__metadata("design:type", metadata_1.Metadata)
], OPDSPublication.prototype, "Metadata", void 0);
tslib_1.__decorate([
    (0, ta_json_x_1.JsonProperty)(LINKS_JSON_PROP),
    (0, ta_json_x_1.JsonElementType)(opds2_link_1.OPDSLink),
    tslib_1.__metadata("design:type", Array)
], OPDSPublication.prototype, "Links", void 0);
tslib_1.__decorate([
    (0, ta_json_x_1.JsonProperty)(IMAGES_JSON_PROP),
    (0, ta_json_x_1.JsonElementType)(publication_link_1.Link),
    tslib_1.__metadata("design:type", Array)
], OPDSPublication.prototype, "Images", void 0);
tslib_1.__decorate([
    (0, ta_json_x_1.JsonProperty)(IMAGE_JSON_PROP),
    tslib_1.__metadata("design:type", publication_link_1.Link)
], OPDSPublication.prototype, "Image", void 0);
tslib_1.__decorate([
    (0, ta_json_x_1.OnDeserialized)(),
    tslib_1.__metadata("design:type", Function),
    tslib_1.__metadata("design:paramtypes", []),
    tslib_1.__metadata("design:returntype", void 0)
], OPDSPublication.prototype, "_OnDeserialized", null);
exports.OPDSPublication = OPDSPublication = tslib_1.__decorate([
    (0, ta_json_x_1.JsonObject)()
], OPDSPublication);
//# sourceMappingURL=opds2-publication.js.map