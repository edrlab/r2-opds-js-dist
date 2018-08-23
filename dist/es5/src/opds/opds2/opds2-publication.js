"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tslib_1 = require("tslib");
var metadata_belongsto_1 = require("r2-shared-js/dist/es5/src/models/metadata-belongsto");
var publication_1 = require("r2-shared-js/dist/es5/src/models/publication");
var ta_json_1 = require("ta-json");
var opds2_collection_1 = require("./opds2-collection");
var opds2_contributor_1 = require("./opds2-contributor");
var opds2_link_1 = require("./opds2-link");
var opds2_publicationMetadata_1 = require("./opds2-publicationMetadata");
var OPDSPublication = (function (_super) {
    tslib_1.__extends(OPDSPublication, _super);
    function OPDSPublication() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    OPDSPublication.prototype.findFirstLinkByRel = function (rel) {
        return this.Links ? this.Links.find(function (l) {
            return l.HasRel(rel);
        }) : undefined;
    };
    OPDSPublication.prototype.AddImage = function (href, typeImage, height, width) {
        var i = new opds2_link_1.OPDSLink();
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
    };
    OPDSPublication.prototype.AddLink_ = function (href, typeLink, rel, title) {
        var l = new opds2_link_1.OPDSLink();
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
    };
    OPDSPublication.prototype.AddAuthor = function (name, identifier, sortAs, href, typeLink) {
        var c = new opds2_contributor_1.OPDSContributor();
        c.Name = name;
        if (identifier) {
            c.Identifier = identifier;
        }
        if (sortAs) {
            c.SortAs = sortAs;
        }
        var l = new opds2_link_1.OPDSLink();
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
    };
    OPDSPublication.prototype.AddSerie = function (name, position, href, typeLink) {
        var c = new opds2_collection_1.OPDSCollection();
        c.Name = name;
        c.Position = position;
        var l = new opds2_link_1.OPDSLink();
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
            this.Metadata.BelongsTo = new metadata_belongsto_1.BelongsTo();
        }
        if (!this.Metadata.BelongsTo.Series) {
            this.Metadata.BelongsTo.Series = [];
        }
        this.Metadata.BelongsTo.Series.push(c);
    };
    OPDSPublication.prototype.AddPublisher = function (name, href, typeLink) {
        var c = new opds2_contributor_1.OPDSContributor();
        c.Name = name;
        var l = new opds2_link_1.OPDSLink();
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
    OPDSPublication = tslib_1.__decorate([
        ta_json_1.JsonObject()
    ], OPDSPublication);
    return OPDSPublication;
}(publication_1.Publication));
exports.OPDSPublication = OPDSPublication;
//# sourceMappingURL=opds2-publication.js.map