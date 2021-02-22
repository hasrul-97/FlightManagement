import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('UserService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientTestingModule]
  }));

  it('should be created', () => {
    const service: UserService = TestBed.get(UserService);
    expect(service).toBeTruthy();
  });

  it('shoould get flight', () => {
    const service: UserService = TestBed.get(UserService)
    let data: {
      statusCode: 200,
      dataList: []
    }

    let response;

    spyOn(service.http, 'get').and.returnValue(of(data))
    service.getFlight().subscribe(data => {
      response = data
    });

    expect(response).toEqual(data);
  })

  it('shoould get passenger flight', () => {
    const service: UserService = TestBed.get(UserService)
    let data: {
      statusCode: 200,
      dataList: []
    }

    let response;

    spyOn(service.http, 'get').and.returnValue(of(data))
    service.getPassengerForFlight('something').subscribe(data => {
      response = data
    });

    expect(response).toEqual(data);
  })

  it('shoould get available seats', () => {
    const service: UserService = TestBed.get(UserService)
    let data: {
      statusCode: 200,
      dataList: []
    }

    let response;

    spyOn(service.http, 'get').and.returnValue(of(data))
    service.getAvailableSeats('something').subscribe(data => {
      response = data
    });

    expect(response).toEqual(data);
  })

  it('shoould check-in', () => {
    const service: UserService = TestBed.get(UserService)
    let data: {
      statusCode: 200,
      dataList: []
    }

    let response;

    spyOn(service.http, 'post').and.returnValue(of(data))
    service.checkin('something', 'something').subscribe(data => {
      response = data
    });

    expect(response).toEqual(data);
  })

  it('should check out', () => {
    const service: UserService = TestBed.get(UserService)
    let data: {
      statusCode: 200,
      dataList: []
    }

    let response;

    spyOn(service.http, 'post').and.returnValue(of(data))
    service.checkOut('something').subscribe(data => {
      response = data
    });

    expect(response).toEqual(data);
  })

  it('shoould get all passenger', () => {
    const service: UserService = TestBed.get(UserService)
    let data: {
      statusCode: 200,
      dataList: []
    }

    let response;

    spyOn(service.http, 'get').and.returnValue(of(data))
    service.getAllPassenger().subscribe(data => {
      response = data
    });

    expect(response).toEqual(data);
  })

  it('shoould update passenger', () => {
    const service: UserService = TestBed.get(UserService)
    let data: {
      statusCode: 200,
      dataList: []
    }

    let response;

    spyOn(service.http, 'get').and.returnValue(of(data))
    service.updatePassenger('something').subscribe(data => {
      response = data
    });

    expect(response).toEqual(data);
  })

  it('shoould register', () => {
    const service: UserService = TestBed.get(UserService)
    let data: {
      statusCode: 200,
      dataList: []
    }

    let response;

    spyOn(service.http, 'post').and.returnValue(of(data))
    service.register('something').subscribe(data => {
      response = data
    });

    expect(response).toEqual(data);
  })

  it('shoould get ancillary service for flight', () => {
    const service: UserService = TestBed.get(UserService)
    let data: {
      statusCode: 200,
      dataList: []
    }

    let response;

    spyOn(service.http, 'get').and.returnValue(of(data))
    service.getAncillarServiceForFlight('something').subscribe(data => {
      response = data
    });

    expect(response).toEqual(data);
  })

  it('shoould get shopping items for flight', () => {
    const service: UserService = TestBed.get(UserService)
    let data: {
      statusCode: 200,
      dataList: []
    }

    let response;

    spyOn(service.http, 'get').and.returnValue(of(data))
    service.getShoppingItemForFlight('something').subscribe(data => {
      response = data
    });

    expect(response).toEqual(data);
  })

  it('shoould get special meal for flight', () => {
    const service: UserService = TestBed.get(UserService)
    let data: {
      statusCode: 200,
      dataList: []
    }

    let response;

    spyOn(service.http, 'get').and.returnValue(of(data))
    service.getSpecialMealsForFlight('something').subscribe(data => {
      response = data
    });

    expect(response).toEqual(data);
  })

});
