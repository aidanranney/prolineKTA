import React from "react";
import { Button, Form, Dropdown, Input, Header } from "semantic-ui-react";
import PrintQRCode from "./PrintQRCode";
import { fetchRecord } from "../../app/fetch/fetches";
import AutoComplete from "./AutoComplete";
import * as ui from "./ui";

class EditKey extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      address: this.props.location.keyRecord.address,
      city: this.props.location.keyRecord.city,
      keyId: this.props.location.keyRecord.key_id,
      keyStorageLocation: this.props.location.keyRecord.storage_location,
      keyOfficeLocation: this.props.location.keyRecord.office_location,
      keyQuantity: this.props.location.keyRecord.key_quantity,
      keyNumber: this.props.location.keyRecord.key_number,
      keyStatus: this.props.location.keyRecord.key_status,
      keyType: this.props.location.keyRecord.key_type,
      active: this.props.location.keyRecord.active,
      deposit: this.props.location.keyRecord.deposit,
      showQR: false,
      propertyNumber: "",
      keyNumber: 0,
      selected: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelected = this.handleSelected.bind(this);
  }

  handleChange(e, data) {
    this.setState({
      [data.name]: data.value
    });
  }

  handleSelected() {
    this.setState({selected: true});
  }

  async handleSubmit(e, data) {
    e.preventDefault();
    console.log(data);
    const {
      city,
      keyId,
      keyStatus,
      keyStorageLocation,
      keyOfficeLocation,
      keyQuantity,
      keyType,
      address,
      deposit
    } = this.state;
    const request = {
      address: address,
      city: city,
      keyId: keyId,
      keyStatus: keyStatus,
      keyStorageLocation: keyStorageLocation,
      keyOfficeLocation: keyOfficeLocation,
      keyQuantity: keyQuantity,
      keyType: keyType,
      deposit: deposit
    };
    await fetchRecord(request, "PUT", "/keyrecord", res => {
      this.setState({
        showQR: true,
        propertyNumber: res.property_number,
        keyNumber: res.key_number
      });
    });
  }

  render() {
    const containerStyle = {
      display: "inline-block",
      paddingTop: 20,
      textAlign: "left",
      width: "50%"
    };

    if (!this.state.showQR) {
      return (
        <div
          style={{
            marginTop: 10,
            padding: 20,
            display: "block",
            textAlign: "center"
          }}
        >
          <div style={containerStyle}>
            <Form onSubmit={this.handleSubmit}>
              <Header className="ui horizontal divider header">
                Edit Key
              </Header>
              <Form.Field>
                <label>Street Address</label>
                <AutoComplete
                  table="address_tab"
                  id="address"
                  as={Input}
                  onChange={this.handleChange}
                  placeholder="Address"
                  type="text"
                  value={this.state.address}
                  name="address"
                  selected={this.handleSelected}
                />
              </Form.Field>
              <Form.Field>
              <label>City</label>
              <Input
                onChange={this.handleChange}
                value={this.state.city}
                placeholder="City"
                name="city"
                required
              />
              </Form.Field>
              <Form.Field>
              <label>Storage Location</label>
              <Input
                onChange={this.handleChange}
                value={this.state.keyStorageLocation}
                placeholder="Storage Location"
                name="keyStorageLocation"
              />
              </Form.Field>
              <Form.Field>
              <label>Office Location</label>
              <Dropdown
                options={ui.keyOfficeLocationOptions}
                onChange={this.handleChange}
                value={this.state.keyOfficeLocation}
                selection
                name="keyOfficeLocation"
                placeholder="Office location..."
              />
              </Form.Field>
              <Form.Field>
              <label>Key Status</label>
              <Dropdown
                options={ui.keyStatusOptions}
                onChange={this.handleChange}
                value={this.state.keyStatus}
                selection
                name="keyStatus"
                placeholder="Status of key"
              />
              </Form.Field>
              <Form.Field>
              <label>Key Quantity</label>
              <Input
                onChange={this.handleChange}
                value={this.state.keyQuantity}
                type="number"
                min="0"
                placeholder="Key Quantity"
                name="keyQuantity"
              />
              </Form.Field>
              <Form.Field>
              <label>Key Type</label>
              <Dropdown
                options={ui.keyTypeOptions}
                onChange={this.handleChange}
                value={this.state.keyType}
                selection
                name="keyType"
                placeholder="Key Type"
              />
              </Form.Field>
              <Form.Field>
              <label>Deposit</label>
              <Input
                onChange={this.handleChange}
                value={this.state.deposit}
                type="number"
                min="0"
                placeholder="Is there a deposit on the key?"
                name="deposit"
              />
              </Form.Field>
              <br />
              <Button type="submit" color="purple">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      );
    } else {
      return (
        <PrintQRCode
          propertyNumber={this.state.propertyNumber}
          keyOfficeLocation={this.state.keyOfficeLocation}
          keyType={this.state.keyType}
          keyNumber={this.state.keyNumber}
          keyQuantity={this.state.keyQuantity}
        />
      );
    }
  }
}

export default EditKey;
