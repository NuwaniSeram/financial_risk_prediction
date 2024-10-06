import React, { useState } from 'react';
import { Form, Input, Select, Button, Card, message, InputNumber,Row,Col,Modal } from 'antd';
import axios from 'axios';

const { Option } = Select;


const countryList = ['Cyprus', 'Luxembourg', 'Uganda', 'French Guiana', 'Tonga',
  'Isle of Man', 'South Georgia and the South Sandwich Islands',
  'Guyana', 'Seychelles', 'Vietnam', 'Falkland Islands (Malvinas)',
  'Dominica', 'Brunei Darussalam', 'French Polynesia', 'Zimbabwe',
  'Haiti', 'Armenia', 'Egypt', 'Jordan', 'Thailand', 'Botswana',
  'Russian Federation', 'Mali', 'Ukraine', 'Ethiopia', 'Angola',
  'Guatemala', 'Monaco', 'Gambia', 'Romania',
  'Palestinian Territory', 'Singapore', 'Saint Pierre and Miquelon',
  'Lesotho', 'Argentina', 'South Africa', 'El Salvador', 'Jersey',
  'Suriname', 'Mayotte', 'Samoa', 'Micronesia', 'Azerbaijan',
  'Austria', 'Indonesia', 'Peru', 'Norway', 'Bangladesh',
  'Sao Tome and Principe', 'Martinique', 'Finland', 'Andorra',
  'Libyan Arab Jamahiriya', 'Costa Rica', 'Western Sahara',
  'Vanuatu', 'Pakistan', 'Grenada', 'New Caledonia', 'Cape Verde',
  'Marshall Islands', 'Wallis and Futuna', 'Morocco', 'Iraq',
  'Bulgaria', 'Mauritius', 'Mauritania', 'Namibia',
  'Holy See (Vatican City State)', 'North Macedonia', 'Liberia',
  'India', 'Tajikistan', 'Georgia', 'Congo', 'Saint Lucia', 'Yemen',
  'Bermuda', 'Niue', 'Greece',
  'United States Minor Outlying Islands', 'Japan', 'Taiwan',
  'Tunisia', 'Reunion', "Cote d'Ivoire", 'Bhutan',
  'United States of America', 'Saint Kitts and Nevis',
  'Equatorial Guinea', 'Myanmar', 'Serbia', 'Oman', 'Niger', 'Chile',
  'Korea', 'Portugal', 'Rwanda', 'Algeria', 'Cambodia',
  'Christmas Island', 'Turkey', 'Sierra Leone', 'Kenya',
  'Papua New Guinea', 'Moldova', 'Poland',
  'Saint Vincent and the Grenadines', 'Senegal', 'Italy',
  'Slovakia (Slovak Republic)',
  'British Indian Ocean Territory (Chagos Archipelago)',
  'San Marino', 'Norfolk Island', 'Trinidad and Tobago', 'Aruba',
  'Afghanistan', 'Macao', 'Antigua and Barbuda', 'Guinea',
  'Pitcairn Islands', 'Kuwait', 'Sweden', 'Panama', 'Venezuela',
  'Bolivia', 'Benin', 'Guernsey', 'Netherlands Antilles',
  'Saudi Arabia', 'Chad', 'Lebanon', 'Saint Barthelemy', 'Nauru',
  'Cayman Islands', 'Mozambique', 'Burkina Faso', 'Puerto Rico',
  'Kazakhstan', 'Guam', 'Paraguay', 'Australia',
  'United Arab Emirates', 'Gibraltar', 'Honduras', 'Nigeria',
  'Nicaragua', 'Belize', 'Latvia', 'Palau', 'Dominican Republic',
  'Timor-Leste', 'Montserrat', 'Fiji', 'Malawi', 'Comoros',
  'Jamaica', 'Croatia', 'Hong Kong', 'Malta', 'Germany', 'Mongolia',
  'Northern Mariana Islands', 'Cocos (Keeling) Islands',
  'Turks and Caicos Islands', 'Tanzania', 'Albania',
  'Bouvet Island (Bouvetoya)', 'China', 'Turkmenistan', 'Tokelau',
  'Uruguay', 'Bahamas', 'Qatar', 'Central African Republic',
  'Syrian Arab Republic', 'Saint Martin', 'Slovenia', 'Barbados',
  'Denmark', 'New Zealand',
  'Antarctica (the territory South of 60 deg S)', 'Togo',
  'United States Virgin Islands', 'Belarus', 'Kyrgyz Republic',
  'Belgium', 'Eritrea', 'France', 'Colombia', 'Faroe Islands',
  'Djibouti', 'Burundi', 'Estonia', 'Uzbekistan', 'Tuvalu',
  'Ecuador', 'Netherlands', 'Zambia', 'Kiribati',
  "Lao People's Democratic Republic", 'British Virgin Islands',
  'Sudan', 'American Samoa', 'Anguilla',
  'Heard Island and McDonald Islands', 'Bosnia and Herzegovina',
  'Mexico', 'Svalbard & Jan Mayen Islands', 'Bahrain', 'Swaziland',
  'Lithuania', 'Maldives', 'Ireland', 'Spain', 'Cuba', 'Switzerland',
  'Philippines', 'Greenland', 'Israel', 'Czech Republic', 'Somalia',
  'Hungary', 'Cameroon', 'Montenegro', 'Nepal',
  'French Southern Territories', 'Guadeloupe', 'Saint Helena',
  'Liechtenstein', 'Iran', 'Guinea-Bissau', 'Ghana', 'Gabon',
  'Malaysia', 'Iceland', 'Brazil', 'Canada', 'Cook Islands',
  'Sri Lanka', 'Madagascar', 'United Kingdom', 'Solomon Islands'];


  const FinancialRiskForm = () => {
    const [formData, setFormData] = useState({});
    const [predictionResult, setPredictionResult] = useState(null);
    const [filteredCountries, setFilteredCountries] = useState(countryList);
    const [isModalVisible, setIsModalVisible] = useState(false);
  
    const handleFormSubmit = async () => {
      try {
        const response = await axios.post('http://localhost:5001/predict', formData);
        setPredictionResult(response.data);
        setIsModalVisible(true); // Show modal with the result
        message.success('Prediction successful');
      } catch (error) {
        message.error('Error in prediction');
      }
    };
  
    const handleChange = (value, fieldName) => {
      setFormData({
        ...formData,
        [fieldName]: value,
      });
    };
  
    const handleCountrySearch = (inputValue) => {
      const filtered = countryList.filter((country) =>
        country.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredCountries(filtered);
    };

    const handleModalClose = () => {
      setIsModalVisible(false); 
    };
  
    return (
      <div style={{ padding: '50px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>Financial Risk Prediction</h1>
        
        <Row justify="center">
          <Col xs={24} sm={20} md={16} lg={12} xl={10}>
            <Form onFinish={handleFormSubmit} layout="vertical">
              
              {/* Age */}
              <Form.Item 
                label="Age" 
                name="age" 
                rules={[{ required: true, message: 'Please enter age' }]}
              >
                <InputNumber 
                  min={18} 
                  max={100} 
                  style={{ width: '100%' }}
                  size="large" 
                  onChange={(value) => handleChange(value, 'age')} 
                />
              </Form.Item>

              {/* Gender */}
              <Form.Item 
                label="Gender" 
                name="gender" 
                rules={[{ required: true, message: 'Please select gender' }]}
              >
                <Select 
                  size="large" 
                  placeholder="Select Gender"
                  onChange={(value) => handleChange(value, 'gender')}
                >
                  <Option value="Male">Male</Option>
                  <Option value="Female">Female</Option>
                  <Option value="Non-binary">Non-binary</Option>
                </Select>
              </Form.Item>

              {/* Country */}
              <Form.Item 
                label="Country" 
                name="country" 
                rules={[{ required: true, message: 'Please select country' }]}
              >
                <Select
                  showSearch
                  size="large"
                  placeholder="Select or type your country"
                  onSearch={handleCountrySearch}  
                  onChange={(value) => handleChange(value, 'country')}
                  filterOption={false}  
                >
                  {filteredCountries.map((country) => (
                    <Option key={country} value={country}>
                      {country}
                    </Option>
                  ))}
                </Select>
              </Form.Item>

              {/* Marital Status */}
              <Form.Item 
                label="Marital Status" 
                name="marital_status" 
                rules={[{ required: true, message: 'Please select marital status' }]}
              >
                <Select 
                  size="large" 
                  placeholder="Select Marital Status"
                  onChange={(value) => handleChange(value, 'marital_status')}
                >
                  <Option value="Single">Single</Option>
                  <Option value="Married">Married</Option>
                  <Option value="Divorced">Divorced</Option>
                  <Option value="Widowed">Widowed</Option>
                </Select>
              </Form.Item>

              {/* Marital Status Change */}
              <Form.Item 
                 label="Marital Status Changes Overtime" 
                 name="marital_status_change" 
                 rules={[{ required: true, message: 'Please enter marital status change' }]}
               >
                <InputNumber 
                  min={0} 
                  style={{ width: '100%' }}
                  size="large" 
                  onChange={(value) => handleChange(value, 'marital_status_change')} 
                />
              </Form.Item>

              {/* Number of Dependents */}
              <Form.Item 
                label="Number of Dependents" 
                name="number_of_dependents" 
                rules={[{ required: true, message: 'Please enter number of dependents' }]}
              >
                <InputNumber 
                  min={0} 
                  max={10} 
                  style={{ width: '100%' }}
                  size="large" 
                  onChange={(value) => handleChange(value, 'number_of_dependents')} 
                />
              </Form.Item>

              {/* Education Level */}
              <Form.Item 
                label="Educational Level" 
                name="education_level" 
                rules={[{ required: true, message: 'Please select education level' }]}
              >
                <Select 
                  size="large" 
                  placeholder="Select Education Level"
                  onChange={(value) => handleChange(value, 'education_level')}
                >
                  <Option value="High School">High School</Option>
                  <Option value="Bachelor's">Bachelor's</Option>
                  <Option value="Master's">Master's</Option>
                  <Option value="PhD">PhD</Option>
                </Select>
              </Form.Item>

              {/* Employment Status */}
              <Form.Item 
                label="Employment Status" 
                name="employment_status" 
                rules={[{ required: true, message: 'Please select employment status' }]}
              >
                <Select 
                  size="large" 
                  placeholder="Select Employment Status"
                  onChange={(value) => handleChange(value, 'employment_status')}
                >
                  <Option value="Employed">Employed</Option>
                  <Option value="Self-employed">Self-employed</Option>
                  <Option value="Unemployed">Unemployed</Option>
                </Select>
              </Form.Item>

              {/* Years at Current Job */}
              <Form.Item 
                label="Years at Current Job" 
                name="years_at_current_job" 
                rules={[{ required: true, message: 'Please enter years at current job' }]}
              >
                <InputNumber 
                  min={0} 
                  max={50} 
                  style={{ width: '100%' }}
                  size="large" 
                  onChange={(value) => handleChange(value, 'years_at_current_job')} 
                />
              </Form.Item>
              
              {/* Income */}
              <Form.Item 
                label="Income" 
                name="income" 
                rules={[{ required: true, message: 'Please enter income' }]}
              >
                <InputNumber 
                  min={0} 
                  style={{ width: '100%' }}
                  size="large" 
                  onChange={(value) => handleChange(value, 'income')} 
                />
              </Form.Item>
              
              {/* Credit Score */}
              <Form.Item 
                label="Credit Score" 
                name="credit_score" 
                rules={[{ required: true, message: 'Please enter credit score' }]}
              >
                <InputNumber 
                  min={300} 
                  max={850} 
                  style={{ width: '100%' }}
                  size="large" 
                  onChange={(value) => handleChange(value, 'credit_score')} 
                />
              </Form.Item>

              {/* Debt-to-Income Ratio */}
              <Form.Item 
                label="Debt-to-Income Ratio" 
                name="debt_to_income_ratio" 
                rules={[{ required: true, message: 'Please enter debt-to-income ratio' }]}
              >
                <InputNumber 
                  min={0} 
                  max={100} 
                  style={{ width: '100%' }}
                  size="large" 
                  onChange={(value) => handleChange(value, 'debt_to_income_ratio')} 
                />
              </Form.Item>
  
               {/* Assets Value */}
               <Form.Item 
                 label="Assets Value" 
                 name="assets_value" 
                 rules={[{ required: true, message: 'Please enter assets value' }]}
               >
                <InputNumber 
                  min={0} 
                  style={{ width: '100%' }}
                  size="large" 
                  onChange={(value) => handleChange(value, 'assets_value')} 
                />
              </Form.Item>

              {/* Previous Defaults */}
              <Form.Item 
                label="Number of previous loans" 
                name="previous_defaults" 
                rules={[{ required: true, message: 'Please enter number of previous defaults' }]}
              >
                <InputNumber 
                  min={0} 
                  style={{ width: '100%' }}
                  size="large" 
                  onChange={(value) => handleChange(value, 'previous_defaults')} 
                />
              </Form.Item>

              {/* Payment History */}
              <Form.Item 
                label="Payment History" 
                name="payment_history" 
                rules={[{ required: true, message: 'Please select payment history' }]}
              >
                <Select 
                  size="large" 
                  placeholder="Select Payment History"
                  onChange={(value) => handleChange(value, 'payment_history')}
                >
                  <Option value="Poor">Poor</Option>
                  <Option value="Fair">Fair</Option>
                  <Option value="Good">Good</Option>
                  <Option value="Excellent">Excellent</Option>
                </Select>
              </Form.Item>
              
              {/* Loan Amount */}
              <Form.Item 
                label="Loan Amount" 
                name="loan_amount" 
                rules={[{ required: true, message: 'Please enter loan amount' }]}
              >
                <InputNumber 
                  min={0} 
                  style={{ width: '100%' }}
                  size="large" 
                  onChange={(value) => handleChange(value, 'loan_amount')} 
                />
              </Form.Item>
  
              {/* Loan Purpose */}
              <Form.Item 
                label="Loan Purpose" 
                name="loan_purpose" 
                rules={[{ required: true, message: 'Please select loan purpose' }]}
              >
                <Select 
                  size="large" 
                  placeholder="Select Loan Purpose"
                  onChange={(value) => handleChange(value, 'loan_purpose')}
                >
                  <Option value="Auto">Auto</Option>
                  <Option value="Business">Business</Option>
                  <Option value="Home">Home</Option>
                  <Option value="Personal">Personal</Option>
                </Select>
              </Form.Item>
  
              <Form.Item>
                <Button type="primary" htmlType="submit" size="large" block>
                  Submit
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
  
        <Modal
        title="Prediction Result"
        visible={isModalVisible}
        onCancel={handleModalClose}
        footer={null} 
      >
        {predictionResult && (
          <div>
            <p><strong>Status:</strong> {predictionResult.status}</p>
            <p><strong>Risk Score:</strong> {predictionResult.risk}</p>
          </div>
        )}
      </Modal>
      </div>
    );
  };
  
  export default FinancialRiskForm;
  
