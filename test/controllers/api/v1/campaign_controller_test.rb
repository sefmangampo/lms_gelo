require "test_helper"

class Api::V1::CampaignControllerTest < ActionDispatch::IntegrationTest
  test "should get index" do
    get api_v1_campaign_index_url
    assert_response :success
  end
end
