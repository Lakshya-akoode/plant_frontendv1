const SocialSubstanceTab = ({ socialSubstance, handleSocialSubstanceChange, setSocialSubstance }) => {
  return (
    <div className="row">
      <div className="col-lg-6">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>Support System Strength</label>
          <select
            className="selectpicker form-select"
            data-live-search="true"
            data-width="100%"
            name="supportSystemStrength"
            value={socialSubstance.supportSystemStrength}
            onChange={handleSocialSubstanceChange}
          >
            <option value="">Select Support System Strength</option>
            <option value="Strong">Strong</option>
            <option value="None">None</option>
          </select>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>Religious Affiliation</label>
          <select
            className="selectpicker form-select"
            data-live-search="true"
            data-width="100%"
            name="religiousAffiliation"
            value={socialSubstance.religiousAffiliation}
            onChange={handleSocialSubstanceChange}
          >
            <option value="">Select Religious Affiliation</option>
            <option value="None">None</option>
            <option value="Christian">Christian</option>
            <option value="Jewish">Jewish</option>
            <option value="Muslim">Muslim</option>
            <option value="Hindu">Hindu</option>
            <option value="Buddhist">Buddhist</option>
            <option value="Spiritual but not religious">Spiritual but not religious</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      {socialSubstance.religiousAffiliation === "Other" && (
        <div className="col-lg-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="religiousOther">Please specify religious affiliation</label>
            <input
              type="text"
              className="form-control"
              id="religiousOther"
              name="religiousOther"
              value={socialSubstance.religiousOther}
              onChange={handleSocialSubstanceChange}
              placeholder="Enter religious affiliation"
            />
          </div>
        </div>
      )}
      <div className="col-lg-6">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>Primary Transportation</label>
          <select
            className="selectpicker form-select"
            data-live-search="true"
            data-width="100%"
            name="primaryTransportation"
            value={socialSubstance.primaryTransportation}
            onChange={handleSocialSubstanceChange}
          >
            <option value="">Select Primary Transportation</option>
            <option value="Car">Car</option>
            <option value="Transit">Transit</option>
            <option value="Walking">Walking</option>
            <option value="Cycling">Cycling</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>
      {socialSubstance.primaryTransportation === "Other" && (
        <div className="col-lg-6">
          <div className="my_profile_setting_input form-group">
            <label htmlFor="transportOther">Please specify transportation</label>
            <input
              type="text"
              className="form-control"
              id="transportOther"
              name="transportOther"
              value={socialSubstance.transportOther}
              onChange={handleSocialSubstanceChange}
              placeholder="Enter transportation"
            />
          </div>
        </div>
      )}
      <div className="col-lg-6">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>Access to Nature</label>
          <select
            className="selectpicker form-select"
            data-live-search="true"
            data-width="100%"
            name="accessToNature"
            value={socialSubstance.accessToNature}
            onChange={handleSocialSubstanceChange}
          >
            <option value="">Select Access to Nature</option>
            <option value="Daily">Daily</option>
            <option value="Rarely">Rarely</option>
          </select>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="communityInvolvement">Community Involvement</label>
          <input
            type="text"
            className="form-control"
            id="communityInvolvement"
            name="communityInvolvement"
            value={socialSubstance.communityInvolvement[0] || ""}
            onChange={(e) => {
              const value = e.target.value;
              setSocialSubstance(prev => ({
                ...prev,
                communityInvolvement: value ? [value] : []
              }));
            }}
            placeholder="Enter community involvement"
          />
        </div>
      </div>
      <div className="col-lg-6">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>Shops Health Products</label>
          <select
            className="selectpicker form-select"
            data-live-search="true"
            data-width="100%"
            name="shopsHealthProducts"
            value={socialSubstance.shopsHealthProducts}
            onChange={handleSocialSubstanceChange}
          >
            <option value="">Select Shops Health Products</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>Tobacco Use</label>
          <select
            className="selectpicker form-select"
            data-live-search="true"
            data-width="100%"
            name="tobaccoUse"
            value={socialSubstance.tobaccoUse}
            onChange={handleSocialSubstanceChange}
          >
            <option value="">Select Tobacco Use</option>
            <option value="Daily">Daily</option>
            <option value="Occasionally">Occasionally</option>
            <option value="Past user">Past user</option>
            <option value="Never">Never</option>
          </select>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="my_profile_setting_input form-group">
          <label htmlFor="caffeineUse">Caffeine Use</label>
          <input
            type="text"
            className="form-control"
            id="caffeineUse"
            name="caffeineUse"
            value={socialSubstance.caffeineUse}
            onChange={handleSocialSubstanceChange}
            placeholder="Enter caffeine use"
          />
        </div>
      </div>
      <div className="col-lg-6">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>Alcohol Use</label>
          <select
            className="selectpicker form-select"
            data-live-search="true"
            data-width="100%"
            name="alcoholUse"
            value={socialSubstance.alcoholUse}
            onChange={handleSocialSubstanceChange}
          >
            <option value="">Select Alcohol Use</option>
            <option value="None">None</option>
            <option value="Social">Social</option>
            <option value="Regularly">Regularly</option>
            <option value="Daily">Daily</option>
            <option value="Past user">Past user</option>
          </select>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>Recovering Alcoholic</label>
          <select
            className="selectpicker form-select"
            data-live-search="true"
            data-width="100%"
            name="recoveringAlcoholic"
            value={socialSubstance.recoveringAlcoholic}
            onChange={handleSocialSubstanceChange}
          >
            <option value="">Select Recovering Alcoholic</option>
            <option value="Yes current">Yes current</option>
            <option value="Yes past">Yes past</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>Illicit Drug Use</label>
          <select
            className="selectpicker form-select"
            data-live-search="true"
            data-width="100%"
            name="illicitDrugUse"
            value={socialSubstance.illicitDrugUse}
            onChange={handleSocialSubstanceChange}
          >
            <option value="">Select Illicit Drug Use</option>
            <option value="Yes current">Yes current</option>
            <option value="Yes past">Yes past</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>Pharmaceuticals Use</label>
          <select
            className="selectpicker form-select"
            data-live-search="true"
            data-width="100%"
            name="pharmaceuticalsUse"
            value={socialSubstance.pharmaceuticalsUse}
            onChange={handleSocialSubstanceChange}
          >
            <option value="">Select Pharmaceuticals Use</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>Pharmaceutical Dependence</label>
          <select
            className="selectpicker form-select"
            data-live-search="true"
            data-width="100%"
            name="pharmaceuticalDependence"
            value={socialSubstance.pharmaceuticalDependence}
            onChange={handleSocialSubstanceChange}
          >
            <option value="">Select Pharmaceutical Dependence</option>
            <option value="Yes current">Yes current</option>
            <option value="Yes past">Yes past</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>Addiction History</label>
          <select
            className="selectpicker form-select"
            data-live-search="true"
            data-width="100%"
            name="addictionHistory"
            value={socialSubstance.addictionHistory}
            onChange={handleSocialSubstanceChange}
          >
            <option value="">Select Addiction History</option>
            <option value="Yes current">Yes current</option>
            <option value="Yes past">Yes past</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>
      <div className="col-lg-6">
        <div className="my_profile_setting_input ui_kit_select_search form-group">
          <label>Cannabis Use</label>
          <select
            className="selectpicker form-select"
            data-live-search="true"
            data-width="100%"
            name="cannabisUse"
            value={socialSubstance.cannabisUse}
            onChange={handleSocialSubstanceChange}
          >
            <option value="">Select Cannabis Use</option>
            <option value="Yes, recreational use">Yes, recreational use</option>
            <option value="Yes, have MMJ card (medical cannabis patient)">Yes, have MMJ card (medical cannabis patient)</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default SocialSubstanceTab;
