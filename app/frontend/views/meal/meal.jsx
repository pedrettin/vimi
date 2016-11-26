var React = require('react')
var _ = require('underscore')
var $ = require('jquery')
var Price = require('./price.jsx')
var Actions = require('./actions.jsx')
var date = require('../../../tools/date.js')
var pricePeople = require('../../../tools/pricePeople.js')

var Meal = React.createClass({

  propTypes: {
    _id: React.PropTypes.string.isRequired,
    name: React.PropTypes.string.isRequired,
    prices: React.PropTypes.array.isRequired,
    people: React.PropTypes.array.isRequired,
    nOrders: React.PropTypes.number.isRequired,
    image: React.PropTypes.string.isRequired,
    action: React.PropTypes.string
  },

  getInitialState: function () {
    return {
      nOrders: this.props.nOrders
    }
  },

  getDefaultProps: function () {
    return {
      action: 'buy'
    }
  },

  addMeal: function () {
    $.ajax({
      method: 'POST',
      url: '/postOrder',
      data: {meal: this.props._id, date: date.thisOrderDelivery().format('MMM DD YYYY, hh')},
      error: (data) => {
        this.setState((state) => {return {nOrders: state.nOrders - 1}})
        this.confirmation('failure')
      },
      success: () => this.confirmation('success')
    })
    this.setState((state) => {return {nOrders: state.nOrders + 1}})
  },

  confirmation: function (type) {
    $('.confirmation.'+type).slideToggle('fast')
    setTimeout(() => $('.confirmation.'+type).slideToggle('fast'),5000)
  },

  render: function () {
    var {action, image, name, people, prices, nOrders} = this.props
    var {nOrders} = this.state
    var peopleToNextDeal = pricePeople.nextPeople(people,prices,nOrders) - nOrders
    return (
      <div className='col-md-6 col-lg-4 meal'>
        <div className='thumbnail'>
          <img src={'images/meals/' + image} alt='Meal Picture' />
          <div className='caption clearfix'>
            <h3 className='food-name'>{name}</h3>
            <Price 
              people={people} 
              prices={prices}
              nOrders={nOrders}
            />
            <br/><hr/>
            <span className='badge'>{peopleToNextDeal}</span> people to next deal
            <br/><hr/>
            {action && <Actions addMeal={this.addMeal} action={action}/>}
          </div>
        </div>
      </div>
    )
  }

})

module.exports = Meal
